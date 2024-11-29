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

const getListFood = async () => {
    return axios.get('/food/list');
}

export {
    postLogin,
    getListFood,
    postLogout,
    postRegister
}
