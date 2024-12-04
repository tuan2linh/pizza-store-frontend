import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Tag,
  Input,
  Button,
  Modal,
  message,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { getAllUsers } from '../../../services/apiService';
import { toast } from 'react-toastify';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if(response && response.success===true){
        setUsers(response.data);
      }
      else{
        toast.error(response?.message || 'Failed to fetch users');
      }
      
    } catch (error) {
        toast.error('Failed to fetch users');
        }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Loyalty Points',
      dataIndex: 'loyaltyPoints',
      key: 'loyaltyPoints',
      sorter: (a, b) => a.loyaltyPoints - b.loyaltyPoints,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Addresses">
            <Button
              icon={<UserOutlined />}
              onClick={() => showAddresses(record)}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showAddresses = (user) => {
    Modal.info({
      title: `Addresses for ${user.fullName}`,
      content: (
        <div>
          {user.addresses.map((addr, index) => (
            <div key={addr._id} style={{ marginBottom: 16 }}>
              <h4>Address {index + 1}</h4>
              <p>Address: {addr.address}</p>
              <p>Recipient: {addr.recipientName}</p>
              <p>Email: {addr.recipientEmail}</p>
              <p>Phone: {addr.recipientPhone}</p>
            </div>
          ))}
        </div>
      ),
      width: 600,
    });
  };

  const handleEdit = (user) => {
    // Implement edit functionality
    message.info('Edit functionality to be implemented');
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `This will permanently delete ${user.fullName}'s account.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          message.success('User deleted successfully');
          fetchUsers();
        } catch (error) {
          message.error('Failed to delete user');
        }
      },
    });
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchText.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search users..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default UserAdmin;
