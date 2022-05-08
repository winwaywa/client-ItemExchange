import axiosClient from './axiosClient';

const userApi = {
    getUser() {
        const url = '/user';
        return axiosClient.get(url);
    },
    getUserById(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    updateUser(data) {
        const url = '/user';
        return axiosClient.put(url, data);
    },
};

export default userApi;
