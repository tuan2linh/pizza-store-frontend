import axios from 'axios';
import {store} from '../redux/store';


const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
    }
});

instance.interceptors.request.use(function
    (config) {
    const token = store?.getState()?.user?.account?.token;
    if (token && config.requiresAuth !== false) {
        config.headers["Authorization"] = token;
      }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response;
}, function (error) {
   return error && error.response && error.response.data
         ? error.response.data
         : Promise.reject(error);
});

export default instance;
