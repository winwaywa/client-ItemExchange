import axiosClient from './axiosClient';

const authApi = {
    register(data) {
        const url = 'auth/register';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = 'auth/login';
        return axiosClient.post(url, data);
    },
    loginWithGoogle(data) {
        const url = 'auth/loginwithgoogle';
        return axiosClient.post(url, data);
    },
};

export default authApi;
