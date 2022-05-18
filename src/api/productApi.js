import axiosClient from './axiosClient';

const productApi = {
    getAllProducts(queryParams) {
        const url = '/products';
        return axiosClient.get(url, { params: queryParams });
    },
    getProductsByUser(queryParams) {
        const url = '/products/me';
        return axiosClient.get(url, { params: queryParams });
    },
    getProduct(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    createProduct(data) {
        const url = `/products`;
        const dataForm = new FormData();
        dataForm.append('product_name', data.product_name);
        dataForm.append('describe', data.describe);
        dataForm.append('percent_new', data.percent_new);
        dataForm.append('price', data.price);
        dataForm.append('category_id', data.category_id);

        //có file gửi lên thì làm
        if (data.images_url.length > 0) {
            for (let i = 0; i < data.images_url.length; i++) {
                dataForm.append(`image-${i + 1}`, data.images_url[i]);
            }
        }
        return axiosClient.post(url, dataForm);
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
