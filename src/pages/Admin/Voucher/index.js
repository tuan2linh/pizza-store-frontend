import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, Space, message
} from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllVouchers, updateVoucher, createVoucher, deleteVoucher } from '../../../services/apiService';
import { toast } from 'react-toastify';

const { Option } = Select;

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Mock data for initial testing
  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
        const response = await getAllVouchers();
        if(response && response.success===true){
            setVouchers(response.data);
        }
        else{
            toast.error(response?message:"Failed to fetch vouchers");
        }   
    } catch (error) {
        console.error('Failed to fetch vouchers', error);
    }
    };

  const columns = [
    { title: 'Code', dataIndex: 'voucher_code' },
    { title: 'Type', dataIndex: 'voucher_type' },
    { title: 'Discount', render: (_, record) => `${record.discount_value}${record.voucher_type === 'percentage' ? '%' : ' VND'}` },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Valid Period',
      render: (_, record) => `${moment(record.start_date).format('DD/MM/YYYY')} - ${moment(record.end_date).format('DD/MM/YYYY')}`
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)} />
        </Space>
      )
    }
  ];

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher);
    form.setFieldsValue({
      ...voucher,
      start_date: moment(voucher.start_date),
      end_date: moment(voucher.end_date)
    });
    setIsModalVisible(true);
  };

  const showDeleteModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsDeleteModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitLoading(true);
      const formattedValues = {
        ...values,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString()
      };
      
      let response;
      if (selectedVoucher) {
        response = await updateVoucher(selectedVoucher._id, formattedValues);
      } else {
        response = await createVoucher(formattedValues);
      }

      if (response.success === true) {
        toast.success(`Voucher ${selectedVoucher ? 'updated' : 'created'} successfully`);
        fetchVouchers(); // Refresh the vouchers list
        handleCancel();
      } else {
        toast.error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteVoucher(selectedVoucher._id);
      
      if (response?.success===true) {
        toast.success('Voucher deleted successfully');
        fetchVouchers(); // Refresh the vouchers list
        setIsDeleteModalVisible(false);
      } else {
        toast.error(response.data.message || 'Delete failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
    form.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Voucher
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={vouchers}
        rowKey="_id"
      />

      <Modal
        title={selectedVoucher ? 'Edit Voucher' : 'Create Voucher'}
        open={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        width={800}
        confirmLoading={submitLoading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="voucher_code" label="Voucher Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="voucher_type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed_amount">Fixed Amount</Option>
              <Option value="free_shipping">Free Shipping</Option>
            </Select>
          </Form.Item>
          <Form.Item name="discount_value" label="Discount Value" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="max_discount" label="Maximum Discount">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="min_order_value" label="Minimum Order Value" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="applicable_to" label="Applicable To" rules={[{ required: true }]}>
            <Select>
              <Option value="all">All</Option>
              <Option value="specific_products">Specific Products</Option>
              <Option value="specific_categories">Specific Categories</Option>
            </Select>
          </Form.Item>
          <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="end_date" label="End Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="usage_limit" label="Usage Limit" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="per_user_limit" label="Per User Limit" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="expired">Expired</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Voucher"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this voucher?</p>
      </Modal>
    </div>
  );
};

export default VoucherPage;
