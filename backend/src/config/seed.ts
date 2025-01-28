// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

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



async function main() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5-second timeout
  const products = [];


  for (let i = 0; i < 50; i++) {


    const imageBuffer = await fetchImageAsBuffer(faker.image.url({ width: 128, height: 128 }));
    if (!imageBuffer) continue;

    products.push({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      image: imageBuffer,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    });
  }

  await prisma.product.createMany({
    data: products,
  });

  console.log('50 fake products generated and added to the database!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
