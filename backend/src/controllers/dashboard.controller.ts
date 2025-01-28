import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const fetchImageAsBuffer = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`error: ${response.status}`);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (err: any) {
    console.error(err.message);
    return;
  } finally {
    clearTimeout(timeout);
  }
};




export class DashboardController {

  static createProduct = async (req: Request, res: Response) => {
    const { name, description, image } = req.body;

    const prisma = new PrismaClient();

    try {
      // Fetch the image from the provided URL
      const imageResponse = await fetchImageAsBuffer(image)
      if (!imageResponse) throw new Error('error: image url invalid');
      // Create the product in the database
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          image: imageResponse,
        },
      });

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);

      res.status(500).json({ error: "Error creating the product" });
    }
  }


  static getProducts = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const {
      page = 1,
      pageSize = 10,
      search = '',
      sortField,
      sortOrder } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);

    let orderBy = {}
    if (sortField) {
      if (sortField == "name") {
        orderBy = {
          ["name"]: sortOrder === 'ascend' ?
            'asc' : 'desc'
        }
      } else {
        orderBy = { [String(sortField)]: sortOrder === 'ascend' ? 'asc' : 'desc' }
      }
    }

    const where: any = search
      ? {
        OR: [
          { name: { contains: search } },
        ],
      }
      : {};

    const [records, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip,
        take: Number(pageSize),
        where,
        orderBy,
      }),
      prisma.product.count({ where })
    ])

    const updatedRecords = records.map((record) => {
      if (record.image) {
        const base64Image = `data:image/jpeg;base64,${Buffer.from(record.image).toString('base64')}`;
        return { ...record, image: base64Image };
      }
      return record;
    });

    res.json({ records: updatedRecords, total });

  }

  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, image, description } = req.body;

    const prisma = new PrismaClient()
    try {
      const bufferImage = image ? Buffer.from(image.split(',')[1], 'base64') : undefined;

      const productUpdated = await prisma.product.update({
        where: { id },
        data: {
          name,
          image: bufferImage,
          description,
        },
      });

      res.status(200).json({
        message: 'Product updated',
        product: productUpdated,
      });
    } catch (error) {
      console.error('Error updating the product:', error);
      res.status(500).json({ error: 'Error updating the product' });
    }
  }
  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const prisma = new PrismaClient()

    try {
      await prisma.product.delete({
        where: { id },
      });
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.error('Error al eliminar product:', error);
      res.status(500).json({ error: 'Error when deleting the product' });
    }
  }

}