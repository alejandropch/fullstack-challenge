import { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Space, message, Spin } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


export default function GeneralTable() {
  const baseURL = "http://localhost:5000"
  const [names, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [editingProduct, setEditingProduct]: any = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // New state for create modal

  const [form] = Form.useForm();
  const fetchProducts = async (params: any = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.get(baseURL + '/api/dashboard/products', {
        params: {
          ...params,
          search: searchText,
        },
        withCredentials: true
      });

      setProducts(data.records);
      setPagination({
        ...params.pagination,
        total: data.total,
      });
    } catch (error) {
      message.error('Error when fetching data from products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({
      pagination,
    });
  }, [pagination.current, searchText]);


  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchProducts({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const { image, ...otherValues } = values;

      // Send POST request
      await axios.post(baseURL + `/api/dashboard/products`, {
        ...otherValues,
        image,
      });

      message.success("Product created successfully");
      setIsCreateModalOpen(false);
      fetchProducts({ pagination });
    } catch {
      message.error("Error when creating product");
    }
  };

  const handleEdit = (record: any) => {
    setEditingProduct(record);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(baseURL + `/api/dashboard/products/${id}`);
      message.success('Product deleted');
      fetchProducts({ pagination });
    } catch {
      message.error('Error when deleting user');
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(baseURL + `/api/dashboard/products/${editingProduct!.id}`, values);
      message.success('Product updated');
      setIsModalOpen(false);
      fetchProducts({ pagination });
    } catch {
      message.error('Error when updating user');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image: string) => {
        return <img
          src={image}
          alt="Product"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />

      },
    },
    {
      title: 'Product',
      dataIndex: 'name',
      sorter: true,
      filterDropdown: () => <Input placeholder="Buscar Product" />,
    },

    {
      title: 'Description',
      dataIndex: 'description',
      sorter: true,
      filterDropdown: () => <Input placeholder="Find by Description" />,
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className='flex space-x-8'>
        <Input
          placeholder="Find by Name"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsCreateModalOpen(true)} />
      </div>
      <Table
        columns={columns}
        dataSource={names}
        loading={loading}
        onChange={handleTableChange}
        rowKey="id"
      />
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* 
            // Drag and drop feature, not finished
            <Form form={form} layout="vertical">
            <Form.Item name="name" label="Product" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Upload.Dragger
                name="file"
                multiple={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    form.setFieldsValue({ image: e.target?.result });
                  };
                  reader.readAsDataURL(file);
                  return false; 
                }}
                accept="image/*"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Supports single file upload. Drag and drop an image here.</p>
              </Upload.Dragger>
            </Form.Item> */
          }
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create Product"
        open={isCreateModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsCreateModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
