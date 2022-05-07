//https://www.npmjs.com/package/axios
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    //Dữ liệu sẽ trả về khi fetch api thành công
    function (response) {
        return response.data;
    },

    //Dữ liệu sẽ trả về khi fetch api thất bại (lỗi 4xx hay 5xx)
    function (error) {
        return Promise.reject(error.response.data);
    }
);
export default axiosClient;
