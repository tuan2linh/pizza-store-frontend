import axios from '../utils/axiosCustomize';

//===== AUTH APIS =====//
const postRegister = async (username, password, email, fullName, phoneNumber) => {
    return axios.post('/auth/register', { username: username, password: password, email: email, fullName: fullName, phoneNumber: phoneNumber });
}

const postLogin = async (username, password) => {
    return axios.post('/auth/login', { username: username, password: password });
}

const postLogout = async () => {
    return axios.post('/auth/logout');
}

//===== USER MANAGEMENT APIS =====//
const getUserProfile = async () => {
    return axios.get('/user/profile');
}

const getAllUsers = async () => {
    return axios.get('/user/all');
}

const updateUserProfile = async (userData) => {
    return axios.put('/user/update', userData);
}

const changePassword = async (oldPassword, newPassword) => {
    return axios.put('/user/change-password', { oldPassword: oldPassword, newPassword: newPassword });
}

//===== USER ADDRESS APIS =====//
const addUserAddress = async (addressData) => {
    return axios.post('/user/address', addressData);
}

const updateAddress = async (addressId,addressData) => {
    return axios.put(`/user/address/${addressId}`, addressData);
}

const deleteUserAddress = async (addressId) => {
    return axios.delete(`/user/address/${addressId}`);
}

//===== PRODUCT APIS =====//
const getAllProducts = async () => {
    return axios.get('/products');
}

const createProduct = async (productData) => {
    return axios.post('/products', productData);
}

const getProductById = async (id) => {
    return axios.get(`/products/${id}`);
}

const updateProduct = async (id, productData) => {
    return axios.put(`/products/${id}`, productData);
}

const deleteProduct = async (id) => {
    return axios.delete(`/products/${id}`);
}

//===== PRODUCT CATEGORY APIS =====//
const getProductsByCategory = async (category) => {
    return axios.get(`/products/filter?mainCategories=${category}`);
}

const getProductsBySubCategory = async (subCategory) => {
    return axios.get(`/products/filter?subCategory=${subCategory}`);
}

//===== CART APIS =====//
const getUserCart = async () => {
    return axios.get('/cart');
}

const updateQuantity = async (itemId, quantity) => {
    return axios.put(`/cart/item/${itemId}`, { quantity: quantity });
}

const addItemToCart = async (productId, quantity, size) => {
    return axios.post('/cart/add', { productId: productId, quantity: quantity, size: size });
}

const removeItemFromCart = async (itemId) => {
    return axios.delete(`/cart/item/${itemId}`);
} // Added missing closing brace here

//===== ORDER APIS =====//
const createOrder = async (orderData) => {
    return axios.post('/orders', orderData);
}

const getUserOrders = async () => {
    return axios.get('/orders/user');
}

const getAllOrders = async () => {
    return axios.get('/orders');
}

const updateOrder = async (orderId, orderData) => {
    return axios.put(`/orders/${orderId}`, orderData);
}

const updateOrderStatus = async (orderId, status) => {
    return axios.put(`/orders/${orderId}/status`, { status: status });
}

//===== VOUCHER APIS =====//
const getAllVouchers = async () => {
    return axios.get('/vouchers');
}
const updateVoucher = async (voucherId, voucherData) => {
    return axios.put(`/vouchers/${voucherId}`, voucherData);
}
const createVoucher = async (voucherData) => {
    return axios.post('/vouchers', voucherData);
}
const deleteVoucher = async (voucherId) => {
    return axios.delete(`/vouchers/${voucherId}`);
}

const applyVoucherToOrder = async (orderId,vouchercode) => {
    return axios.post(`/orders/${orderId}/voucher`, { voucherCode: vouchercode });
}

const checkVoucher = async (voucherCode) => {
    return axios.post(`/vouchers/check`, { voucher_code: voucherCode });
}

export {
    postLogin,
    postLogout,
    postRegister,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySubCategory,
    getUserCart,
    updateQuantity,
    addItemToCart,
    removeItemFromCart,
    createOrder,
    applyVoucherToOrder,
    checkVoucher,
    createProduct,
    updateProduct,
    deleteProduct,    getUserProfile,    addUserAddress,    updateAddress,    updateUserProfile,    deleteUserAddress,
    changePassword,
    getUserOrders,
    updateOrder,
    updateOrderStatus,
    getAllOrders,
    getAllUsers,
    getAllVouchers,
    updateVoucher,
    createVoucher,
    deleteVoucher
}
