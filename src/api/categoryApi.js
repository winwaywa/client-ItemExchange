import axiosClient from './axiosClient';

const categoryApi = {
    getAllCategory() {
        const url = '/categories';
        return axiosClient.get(url);
    },
    getCategory(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    createCategory(data) {
        const url = `/categories`;
        return axiosClient.post(url, data);
    },
    deleteCategory(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};

export default categoryApi;
