import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Modal, Input, Select, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { getAllOrders, updateOrder, updateOrderStatus } from '../../../services/apiService';
import { toast } from 'react-toastify';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState(null);

    const fetchOrders = async () => {
        try {
            
            const response = await getAllOrders();
            if(response && response.success===true) {
                setOrders(response.data);
            }
            else {
                toast.error(response?.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Failed to fetch orders: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // const fetchOrders = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setOrders(mockOrders);
    //         setLoading(false);
    //     }, 500); // Simulate API delay
    // };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await updateOrderStatus(orderId, newStatus);
            if(response && response.success===true) {
                toast.success('Cập nhật trạng thái đơn hàng thành công');
                fetchOrders();
            }
            else {
                toast.error(response?.message || 'Không thể cập nhật trạng thái đơn hàng');
            }
        }catch(error) {
            console.error('Failed to update order status: ', error);
            toast.error('Không thể cập nhật trạng thái đơn hàng');
        }
    };

    const handleDeliveryStatusChange = async (orderId, type, newStatus) => {
        try {
            const deliveryInfo = {
                type: type,
                status: newStatus
            };
            
            const response = await updateOrder(orderId, { deliveryInfo });
            if(response && response.success === true) {
                toast.success('Cập nhật trạng thái giao hàng thành công');
                fetchOrders(); // Refresh orders after successful update
                setModalVisible(false); // Close modal after successful update
            } else {
                toast.error(response?.message || 'Không thể cập nhật trạng thái giao hàng');
            }
        } catch (error) {
            console.error('Failed to update delivery status: ', error);
            toast.error('Không thể cập nhật trạng thái giao hàng');
        }
    };

    const handlePaymentStatusChange = async (orderId,method, newStatus) => {
        try {
            const paymentDetails = {
                method: method,
                status: newStatus
            };
            
            const response = await updateOrder(orderId, { paymentDetails });
            if(response && response.success === true) {
                toast.success('Cập nhật trạng thái thanh toán thành công');
                fetchOrders(); // Refresh orders after successful update
                setModalVisible(false); // Close modal after successful update
            } else {
                toast.error(response?.message || 'Không thể cập nhật trạng thái thanh toán');
            }
        } catch (error) {
            console.error('Failed to update payment status: ', error);
            toast.error('Không thể cập nhật trạng thái thanh toán');
        }
    };

    const showOrderDetails = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'gold',
            confirmed: 'blue',
            processing: 'cyan',
            ready: 'lime',
            completed: 'green',
            cancelled: 'red',
            refunded: 'volcano'
        };
        return colors[status] || 'default';
    };

    const columns = [
        {
            title: 'Mã Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Khách Hàng',
            dataIndex: 'customerInfo',
            key: 'customer',
            render: (customerInfo) => `${customerInfo.name} (${customerInfo.phone})`,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'orderSummary',
            key: 'total',
            render: (summary) => `${summary.total.toLocaleString('vi-VN')}₫`,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'orderStatus',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Thanh Toán',
            key: 'payment',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Tag color="purple">
                        {record.paymentDetails.method.toUpperCase()}
                    </Tag>
                    <Tag color={record.paymentDetails.status === 'paid' ? 'green' : 'gold'}>
                        {record.paymentDetails.status.toUpperCase()}
                    </Tag>
                </Space>
            ),
        },
        {
            title: 'Giao Hàng',
            key: 'delivery',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Tag color="blue">
                        {record.deliveryInfo.type.toUpperCase()}
                    </Tag>
                    <Tag color={record.deliveryInfo.status === 'delivered' ? 'green' : 'gold'}>
                        {record.deliveryInfo.status.toUpperCase()}
                    </Tag>
                </Space>
            ),
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Thao Tác',
            key: 'actions',
            width: 280, // Thêm width cố định
            render: (_, record) => (
                <Space direction="vertical" size="small" className="w-full">
                    <div className="flex gap-2">
                        <Button type="primary" onClick={() => showOrderDetails(record)}>
                            Chi Tiết
                        </Button>
                        <Select
                            value={record.orderStatus}
                            onChange={(value) => handleStatusChange(record._id, value)}
                            style={{ width: 180 }}
                        >
                            <Option value="pending">Đang Chờ</Option>
                            <Option value="confirmed">Đã Xác Nhận</Option>
                            <Option value="processing">Đang Xử Lý</Option>
                            <Option value="ready">Sẵn Sàng</Option>
                            <Option value="completed">Hoàn Thành</Option>
                            <Option value="cancelled">Đã Hủy</Option>
                            <Option value="refunded">Đã Hoàn Tiền</Option>
                        </Select>
                    </div>
                </Space>
            ),
        },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order._id.toLowerCase().includes(searchText.toLowerCase()) ||
            order.customerInfo.name.toLowerCase().includes(searchText.toLowerCase()) ||
            order.customerInfo.phone.includes(searchText);
        
        const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
        
        const matchesDate = !dateRange || 
            (moment(order.createdAt).isAfter(dateRange[0].startOf('day')) &&
             moment(order.createdAt).isBefore(dateRange[1].endOf('day')));

        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Đơn Hàng</h1>
            
            <div className="mb-6 flex gap-4">
                <Search
                    placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, hoặc số điện thoại"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                
                <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={setFilterStatus}
                >
                    <Option value="all">Tất Cả Trạng Thái</Option>
                    <Option value="pending">Đang Chờ</Option>
                    <Option value="confirmed">Đã Xác Nhận</Option>
                    <Option value="processing">Đang Xử Lý</Option>
                    <Option value="ready">Sẵn Sàng</Option>
                    <Option value="completed">Hoàn Thành</Option>
                    <Option value="cancelled">Đã Hủy</Option>
                    <Option value="refunded">Đã Hoàn Tiền</Option>
                </Select>
                
                <RangePicker onChange={setDateRange} />
            </div>

            <Table 
                columns={columns} 
                dataSource={filteredOrders}
                loading={loading}
                rowKey="_id"
            />

            <Modal
                title={
                    <div className="flex items-center gap-4 pr-8"> {/* Thêm padding-right để tránh đè với nút close */}
                        <div className="flex-1">
                            <span className="font-medium">Chi Tiết Đơn Hàng #{selectedOrder?._id}</span>
                        </div>
                        <div>
                            <Tag color={getStatusColor(selectedOrder?.orderStatus)}>
                                {selectedOrder?.orderStatus?.toUpperCase()}
                            </Tag>
                        </div>
                    </div>
                }
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                width={800}
                footer={null}
            >
                {selectedOrder && (
                    <>
                        <div className="space-y-6">
                            {/* Customer Information Card */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Thông Tin Khách Hàng
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Tên</p>
                                        <p className="font-medium">{selectedOrder.customerInfo.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Số Điện Thoại</p>
                                        <p className="font-medium">{selectedOrder.customerInfo.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Email</p>
                                        <p className="font-medium">{selectedOrder.customerInfo.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Địa Chỉ</p>
                                        <p className="font-medium">
                                            {`${selectedOrder.customerInfo.address.street}, ${selectedOrder.customerInfo.address.ward}, ${selectedOrder.customerInfo.address.district}, ${selectedOrder.customerInfo.address.city}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items Card */}
                            <div className="bg-white border rounded-lg">
                                <h3 className="text-lg font-semibold p-4 border-b">
                                    Sản Phẩm Đặt Hàng
                                </h3>
                                <Table
                                    dataSource={selectedOrder.items}
                                    columns={[
                                        {
                                            title: 'Sản Phẩm',
                                            key: 'product',
                                            render: (_, record) => (
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={record.productId.image}
                                                        alt={record.productId.name}
                                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    />
                                                    <span className="font-medium">{record.productId.name}</span>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Kích Thước',
                                            dataIndex: 'size',
                                            key: 'size',
                                            render: (size) => (
                                                <Tag color="blue">{size.toUpperCase()}</Tag>
                                            ),
                                        },
                                        {
                                            title: 'Số Lượng',
                                            dataIndex: 'quantity',
                                            key: 'quantity',
                                            render: (qty) => (
                                                <span className="font-medium">{qty}</span>
                                            ),
                                        },
                                        {
                                            title: 'Đơn Giá',
                                            dataIndex: 'price',
                                            key: 'price',
                                            render: (price) => (
                                                <span className="font-medium">{price.toLocaleString('vi-VN')}₫</span>
                                            ),
                                        },
                                        {
                                            title: 'Thành Tiền',
                                            dataIndex: 'subTotal',
                                            key: 'subTotal',
                                            render: (subTotal) => (
                                                <span className="font-medium text-blue-600">{subTotal.toLocaleString('vi-VN')}₫</span>
                                            ),
                                        },
                                    ]}
                                    pagination={false}
                                    rowKey="productId"
                                />
                            </div>

                            {/* Delivery Information Card */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Thông Tin Giao Hàng
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Loại</span>
                                        <Tag color="blue">
                                            {selectedOrder.deliveryInfo.type.toUpperCase()}
                                        </Tag>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Trạng Thái</span>
                                        <Select
                                            value={selectedOrder.deliveryInfo.status}
                                            onChange={(value) => handleDeliveryStatusChange(selectedOrder._id,selectedOrder.deliveryInfo.type, value)}
                                            style={{ width: 120 }}
                                        >
                                            <Option value="pending">Đang Chờ</Option>
                                            <Option value="preparing">Đang Chuẩn Bị</Option>
                                            <Option value="ready_for_delivery">Sẵn Sàng Giao</Option>
                                            <Option value="out_for_delivery">Đang Giao</Option>
                                            <Option value="delivered">Đã Giao</Option>
                                        </Select>
                                    </div>
                                    {selectedOrder.deliveryInfo.trackingNotes.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-gray-600 mb-2">Ghi Chú Theo Dõi:</p>
                                            <div className="space-y-2">
                                                {selectedOrder.deliveryInfo.trackingNotes.map((note, index) => (
                                                    <div key={index} className="bg-white p-2 rounded border">
                                                        {note}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment and Summary Cards */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                        Chi Tiết Thanh Toán
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Phương Thức</span>
                                            <span className="font-medium capitalize">
                                                {selectedOrder.paymentDetails.method}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Trạng Thái</span>
                                            <Select
                                                value={selectedOrder.paymentDetails.status}
                                                onChange={(value) => handlePaymentStatusChange(selectedOrder._id, selectedOrder.paymentDetails.method,value)}
                                                style={{ width: 120 }}
                                            >
                                                <Option value="pending">Đang Chờ</Option>
                                                <Option value="paid">Đã Thanh Toán</Option>
                                                <Option value="failed">Thất Bại</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                        Tóm Tắt Đơn Hàng
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tạm Tính</span>
                                            <span>{selectedOrder.orderSummary.subtotal.toLocaleString('vi-VN')}₫</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Phí Giao Hàng</span>
                                            <span>{selectedOrder.orderSummary.deliveryFee.toLocaleString('vi-VN')}₫</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Giảm Giá</span>
                                            <span className="text-green-600">
                                                -{selectedOrder.orderSummary.discount.toLocaleString('vi-VN')}₫
                                            </span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between font-semibold">
                                                <span>Tổng Cộng</span>
                                                <span className="text-lg text-blue-600">
                                                    {selectedOrder.orderSummary.total.toLocaleString('vi-VN')}₫
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderAdmin;