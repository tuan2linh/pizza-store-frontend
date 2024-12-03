import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, 
  Space, Popconfirm, message, InputNumber,
  Select, Popover, Input as AntInput 
} from 'antd';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../../services/apiService';

const { Search } = AntInput;

// Helper function to format price to VND
const formatToVND = (price) => {
  return `${price?.toLocaleString('vi-VN')} đ`;
};

const CATEGORIES = [
  'pizza',
  'chicken',
  'pasta',
  'appetizers',
  'desserts',
  'drinks'
];

const SUBCATEGORIES = ['beef', 'seafood', 'chicken', 'pork', 'vegetarian'];

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response && response.success===true) {
        setProducts(response.data);
      }
    } catch (error) {
        console.error('Failed to fetch products: ', error);
    }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Popover 
          content={text} 
          title="Product Description"
          trigger="hover"
        >
          <div style={{ 
            maxWidth: 200, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}>
            {text}
          </div>
        </Popover>
      ),
    },
    {
      title: 'Giá',
      key: 'price',
      render: (_, record) => (
        <Space direction="vertical">
          <span>Nhỏ: {formatToVND(record.price?.small)}</span>
          <span>Vừa: {formatToVND(record.price?.medium)}</span>
          <span>To: {formatToVND(record.price?.large)}</span>
        </Space>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'mainCategories',
      key: 'mainCategories',
    },
    {
      title: 'Danh mục con',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategories) => {
        if (Array.isArray(subCategories)) {
          return subCategories.join(', ');
        }
        return subCategories;
      }
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      render: () => 'Đang phát triển'
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setSelectedCategory(product.mainCategories);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (productId) => {
    try {
        const response = await deleteProduct(productId);
        if (response && response.success===true) {
            message.success('Product deleted successfully');
            fetchProducts();
        }
        else {
            message.error(response?.message || 'Failed to delete product');
        }
        } catch (error) {
        console.error('Error deleting product:', error);
        message.error('Failed to delete product');
    }
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      if (editingProduct) {
        // Update existing product
        try {
            const response = await updateProduct(editingProduct._id, values);
            if (response && response.success===true) {
                message.success('Product updated successfully');
                fetchProducts();
                setEditingProduct(null);
                setIsModalVisible(false);
                form.resetFields();
            }
            else {
                message.error(response?.message || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Failed to update product');
        }
      } else {
        // Add new product
        try {
          const response = await createProduct(values);
          if (response && response.success===true) {
            message.success('Product added successfully');
            fetchProducts();
            setSelectedCategory(null);
            form.resetFields();
          }
          else {
            message.error(response?.message || 'Failed to add product');
          }
        } catch (error) {
          console.error('Error creating product:', error);
          message.error('Failed to add product');
        }
      }
      setIsModalVisible(false);
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ subcategory: undefined }); // Reset subcategory when category changes
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Button type="primary" onClick={handleAdd}>
          Thêm sản phẩm mới
        </Button>
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredProducts} 
        rowKey="id"
        pagination={{
          pageSize: 8,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: false,
          showQuickJumper: true
        }}
      />

      <Modal
        title={editingProduct ? 'Chỉnh sửa thông tin' : 'Thêm sản phẩm mới'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          form.resetFields();
          setEditingProduct(null);
          setSelectedCategory(null);
          setIsModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="mainCategories"
            label="Danh mục"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select onChange={handleCategoryChange}>
              {CATEGORIES.map(category => (
                <Select.Option key={category.toLowerCase()} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subCategory"
            label="Danh mục con"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('mainCategories') === 'pizza',
                message: getFieldValue('mainCategories') === 'pizza' ? 
                  'Vui lòng chọn ít nhất một danh mục con cho pizza' : undefined
              })
            ]}
          >
            <Select 
              mode="multiple"
              placeholder="Chọn một hoặc nhiều danh mục con"
              style={{ width: '100%' }}
            >
              {selectedCategory && SUBCATEGORIES.map(sub => (
                <Select.Option key={sub} value={sub}>
                  {sub}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Giá">
            <Space direction="vertical" style={{ width: '100%' }}>
            {editingProduct ? (
                <>
                  <Form.Item
                    name={['price', 'small']}
                    label="Cỡ nhỏ"
                  >
                    <InputNumber
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\D/g, '')}
                      addonAfter="đ"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['price', 'medium']}
                    label="Cỡ vừa"
                  >
                    <InputNumber
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\D/g, '')}
                      addonAfter="đ"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['price', 'large']}
                    label="Cỡ lớn"
                  >
                    <InputNumber
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\D/g, '')}
                      addonAfter="đ"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                <Form.Item
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      validator: async (_, value) => {
                        const prices = form.getFieldValue('price');
                        if (!prices?.small && !prices?.medium && !prices?.large) {
                          throw new Error('Vui lòng nhập ít nhất một mức giá');
                        }
                      }
                    }
                  ]}
                >
                  <></>
                </Form.Item>
                </>
                ) : (
                <>
                { selectedCategory === 'pizza' && (
                    <Form.Item
                    name={['price', 'small']}
                    label="Cỡ nhỏ"
                  >
                      <InputNumber
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\D/g, '')}
                          addonAfter="đ"
                          style={{ width: '100%' }}
                      />
                    </Form.Item>
                )
                }
                <Form.Item
                  name={['price', 'medium']}
                  label="Cỡ vừa"
                >
                    <InputNumber
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\D/g, '')}
                        addonAfter="đ"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                { selectedCategory === 'pizza' && (
                    <Form.Item
                  name={['price', 'large']}
                  label="Cỡ lớn"
                >
                    <InputNumber
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\D/g, '')}
                        addonAfter="đ"
                        style={{ width: '100%' }}
                    />
                    </Form.Item>
                )}
                
                </>
            )
            }
              
            </Space>
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductAdmin;
