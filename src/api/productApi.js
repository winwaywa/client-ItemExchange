import axiosClient from './axiosClient';

const productApi = {
    getAllProducts() {
        const url = '/products';
        return axiosClient.get(url);
    },
    getProductsByUser() {
        const url = '/products/me';
        return axiosClient.get(url);
    },
    getProduct(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    createProduct(data) {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
    updateProduct(id, data) {
        const url = `/products/${id}`;
        return axiosClient.put(url, data);
    },
    deleteProduct(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productApi;
