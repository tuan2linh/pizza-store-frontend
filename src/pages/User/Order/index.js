import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Tag, Space, Typography, Descriptions, Badge, Image, Card, Divider } from 'antd';
import dayjs from 'dayjs';
import { getUserOrders } from '../../../services/apiService';

const { Title } = Typography;

// Mock data updated to match API response
const mockOrders = [
  {
    _id: '674eead20ad9d8547573a1d2',
    userId: {
      _id: '674ec85672d05cbe2a446047',
      email: 'user3@gmail.com'
    },
    items: [
      {
        productId: {
          price: {
            medium: 235000,
            large: 345000,
            small: null
          },
          _id: '674b5bbdb9e2e389d8b436ce',
          name: 'Pizza Siêu Topping Bơ Gơ Bò Mỹ Xốt Habanero',
          image: 'https://img.dominos.vn/cheeseburger-habanero-sup.jpg'
        },
        quantity: 1,
        size: 'medium',
        price: 235000,
        subTotal: 235000,
        _id: '674eeab20ad9d8547573a1c3'
      },
      {
        productId: {
          price: {
            medium: 235000,
            large: 345000,
            small: null
          },
          _id: '674b5bbdb9e2e389d8b436ce',
          name: 'Pizza Siêu Topping Bơ Gơ Bò Mỹ Xốt Habanero',
          image: 'https://img.dominos.vn/cheeseburger-habanero-sup.jpg'
        },
        quantity: 1,
        size: 'medium',
        price: 235000,
        subTotal: 235000,
        _id: '674eeab20ad9d8547573a1c3'
      }
    ],
    customerInfo: {
      name: 'aaa',
      phone: '0926205686',
      email: 'a@gmail.com',
      address: {
        street: 'abc',
        city: 'abc',
        district: 'abc',
        ward: 'abc',
        notes: ''
      }
    },
    paymentDetails: {
      method: 'cash',
      status: 'pending'
    },
    orderSummary: {
      subtotal: 235000,
      deliveryFee: 300000,
      discount: 0,
      total: 535000
    },
    deliveryInfo: {
      type: 'delivery',
      status: 'pending',
      trackingNotes: []
    },
    orderStatus: 'pending',
    createdAt: '2024-12-03T11:26:10.906Z'
  },
  {
    customerInfo: {
      address: {
        street: "abc",
        city: "abc",
        district: "abc",
        ward: "abc",
        notes: ""
      },
      name: "aaa",
      phone: "0926205686",
      email: "a@gmail.com"
    },
    paymentDetails: {
      method: "cash",
      status: "pending"
    },
    orderSummary: {
      subtotal: 235000,
      deliveryFee: 300000,
      discount: 0,
      total: 535000
    },
    deliveryInfo: {
      type: "delivery",
      status: "pending",
      trackingNotes: []
    },
    _id: "674eead20ad9d8547573a1d2",
    userId: {
      _id: "674ec85672d05cbe2a446047",
      email: "user3@gmail.com"
    },
    items: [
      {
        productId: {
          price: {
            medium: 235000,
            large: 345000,
            small: null
          },
          promotionPrice: {
            small: 0,
            medium: 0,
            large: 0
          },
          _id: "674b5bbdb9e2e389d8b436ce",
          name: "Pizza Siêu Topping Bơ Gơ Bò Mỹ Xốt Habanero",
          description: "Tăng 50% lượng topping protein: Thịt Bò Bơ Gơ, Thịt Heo Xông Khói, Xốt Habanero, Phô Mai, Dưa Chuột, Cà Chua",
          image: "https://img.dominos.vn/cheeseburger-habanero-sup.jpg",
          mainCategories: ["pizza"],
          subCategory: ["beef"],
        },
        quantity: 1,
        size: "medium",
        price: 235000,
        subTotal: 235000,
        _id: "674eeab20ad9d8547573a1c3"
      }
    ],
    orderStatus: "pending",
    createdAt: "2024-12-03T11:26:10.906Z"
  }
];

const statusColors = {
  pending: 'warning',
  confirmed: 'processing',
  processing: 'processing',
  ready: 'success',
  completed: 'success',
  cancelled: 'error',
  refunded: 'default'
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
        const response = await getUserOrders();
        if(response && response.success===true){
            setOrders(response.data);
        }
        else{
            console.error('Failed to fetch orders: ', response?.message);
        }
    } catch (error) {
        console.error('Failed to fetch orders: ', error);
    }
    };
    useEffect(() => {
        getOrders();
    }, []);
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      width: 250,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Tổng tiền',
      dataIndex: ['orderSummary', 'total'],
      key: 'total',
      render: (total) => `${total.toLocaleString('vi-VN')}₫`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'status',
      render: (status) => {
        const statusText = {
          pending: 'ĐANG CHỜ',
          confirmed: 'ĐÃ XÁC NHẬN',
          processing: 'ĐANG XỬ LÝ',
          ready: 'SẴN SÀNG',
          completed: 'HOÀN THÀNH',
          cancelled: 'ĐÃ HỦY',
          refunded: 'HOÀN TIỀN'
        };
        return <Tag color={statusColors[status]}>{statusText[status]}</Tag>;
      },
    }
  ];

  const expandedRowRender = (record) => (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Thông tin khách hàng" span={2}>
        {record.customerInfo.name} - {record.customerInfo.phone}
        {record.customerInfo.email && ` - ${record.customerInfo.email}`}
      </Descriptions.Item>
      
      <Descriptions.Item label="Địa chỉ giao hàng" span={2}>
        {`${record.customerInfo.address.street}, ${record.customerInfo.address.ward}, ${record.customerInfo.address.district}, ${record.customerInfo.address.city}`}
        {record.customerInfo.address.notes && <div>Ghi chú: {record.customerInfo.address.notes}</div>}
      </Descriptions.Item>
      
      <Descriptions.Item label="Sản phẩm" span={2}>
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
          {record.items.map((item, index) => (
            <React.Fragment key={item._id}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', // Changed from center to flex-start
                padding: '16px', // Increased padding
                background: 'white',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  minWidth: '120px', // Added fixed width container for image
                  marginRight: '30px' // Increased margin
                }}>
                  <Image
                    src={item.productId.image}
                    alt={item.productId.name}
                    width={120} // Slightly larger image
                    height={120}
                    style={{ 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0'
                    }}
                  />
                </div>
                <div style={{ 
                  flex: 1,
                  paddingTop: '8px' // Added top padding
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#1890ff'
                  }}>
                    {item.productId.name}
                  </div>
                  <Space size="large">
                    <div>
                      <span style={{ color: '#666' }}>Kích cỡ: </span>
                      <Tag color="blue">{item.size.toUpperCase()}</Tag>
                    </div>
                    <div>
                      <span style={{ color: '#666' }}>Số lượng: </span>
                      <Tag color="green">{item.quantity}</Tag>
                    </div>
                    <div>
                      <span style={{ color: '#666' }}>Giá: </span>
                      <span style={{ 
                        fontWeight: 'bold',
                        color: '#f5222d'
                      }}>
                        {item.subTotal.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </Space>
                </div>
              </div>
              {index < record.items.length - 1 && (
                <Divider style={{ margin: '12px 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Descriptions.Item>
      
      <Descriptions.Item label="Phương thức thanh toán">
        {record.paymentDetails.method === 'cash' ? 'TIỀN MẶT' : 'CHUYỂN KHOẢN'}
      </Descriptions.Item>
      
      <Descriptions.Item label="Trạng thái thanh toán">
        <Badge status={record.paymentDetails.status === 'paid' ? 'success' : 'processing'} 
          text={record.paymentDetails.status === 'paid' ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'} 
        />
      </Descriptions.Item>
      
      <Descriptions.Item label="Trạng thái giao hàng">
        <Badge status={record.deliveryInfo.status === 'delivered' ? 'success' : 'processing'} 
          text={record.deliveryInfo.status === 'delivered' ? 'ĐÃ GIAO' : 'ĐANG GIAO'} 
        />
      </Descriptions.Item>
      
      <Descriptions.Item label="Tổng quan đơn hàng" span={2}>
        <div>Tạm tính: {record.orderSummary.subtotal.toLocaleString('vi-VN')}₫</div>
        <div>Phí giao hàng: {record.orderSummary.deliveryFee.toLocaleString('vi-VN')}₫</div>
        <div>Giảm giá: {record.orderSummary.discount.toLocaleString('vi-VN')}₫</div>
        <div>Tổng cộng: {record.orderSummary.total.toLocaleString('vi-VN')}₫</div>
      </Descriptions.Item>
    </Descriptions>
  );

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Đơn hàng của tôi</Title>
      <Table 
        columns={columns}
        dataSource={orders}
        expandable={{ expandedRowRender }}
        rowKey="_id"
      />
    </div>
  );
};

export default OrderPage;
