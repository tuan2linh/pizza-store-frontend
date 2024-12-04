import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

// Mock data with new structure
const initialPromotions = [
  {
    id: 1,
    name: 'Family Feast Deal',
    descriptions: [
      'Buy 2 large pizzas get 1 free',
      'Free 2L drink included',
    ],
    image: 'https://img.dominos.vn/promotion+m2t3+-+3%27.png',
    combos: [
      'Family Pack XL',
      'Double Pizza Deal',
    ]
  },
  {
    id: 2,
    name: 'Student Special',
    descriptions: [
      'Show student ID to get 15% off',
      'Valid Monday to Thursday'
    ],
    image: 'https://img.dominos.vn/banner+promo+70+new+(1).png',
    combos: [
      'Student Meal',
      'Study Group Pack'
    ]
  }
];

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    toast.info("👨‍💻 Đang phát triển");
    }, []);

  const columns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name' 
    },
    {
      title: 'Descriptions',
      dataIndex: 'descriptions',
      key: 'descriptions',
      render: (descriptions) => (
        <ul>
          {descriptions.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} alt="Promotion" style={{ width: 100 }} />
      )
    },
    {
      title: 'Combos',
      dataIndex: 'combos',
      key: 'combos',
      render: (combos) => (
        <ul>
          {combos.map((combo, index) => (
            <li key={index}>{combo}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ];

  const handleAdd = () => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleEdit = (promotion) => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleDelete = (id) => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(values => {
        if (editingPromotion) {
            toast.info("👨‍💻 Đang phát triển");
        } else {
            toast.info("👨‍💻 Đang phát triển");
        }
        setIsModalVisible(false);
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Promotion
        </Button>
      </div>

      <Table columns={columns} dataSource={promotions} rowKey="id" />

      <Modal
        title={editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Promotion Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Descriptions">
            <Form.List name="descriptions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter description" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Description
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            name="image"
            label="Promotion Image URL"
            rules={[
              { required: true, message: 'Please input the image URL!' },
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item label="Combos">
            <Form.List name="combos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter combo name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Combo
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
