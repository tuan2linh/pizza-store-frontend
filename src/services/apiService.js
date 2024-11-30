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

const getProductById = async (id) => {
        return axios.get(`/products/${id}`);
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

export {
    postLogin,
    postLogout,
    postRegister,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySubCategory
}
