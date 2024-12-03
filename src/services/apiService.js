import axios from '../utils/axiosCustomize';

const postRegister = async (username, password, email) => {
    return axios.post('/auth/register', { username: username, password: password, email: email }
    );
}

const postLogin = async (username, password) => {
    return axios.post('/auth/login', { username: username, password: password }
    );
}

const postLogout = async () => {
    return axios.post('/auth/logout');
}

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
/**
    "maincategory": "GET /api/products/filter?mainCategories=Coffee",
    "multiplemain": "GET /api/products/filter?mainCategories[]=Coffee&mainCategories[]=Tea",
    "sub": "GET /api/products/filter?subCategory=Espresso",
    "mutilplesub": "GET /api/products/filter?mainCategories[]=Coffee&subCategory=Espresso" 
*/
const getProductsByCategory = async (category) => {
    return axios.get(`/products/filter?mainCategories=${category}`);
}

const getProductsBySubCategory = async (subCategory) => {
    return axios.get(`/products/filter?subCategory=${subCategory}`);
}
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
}

const createOrder = async (orderData) => {
    return axios.post('/orders', orderData);
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
    deleteProduct
}
