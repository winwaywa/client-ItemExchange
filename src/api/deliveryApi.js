import axiosClient from './axiosClient';

const deliveryApi = {
    getAllDelivery() {
        const url = `/delivery`;
        return axiosClient.get(url);
    },
    createDelivery(data) {
        const url = `/delivery`;
        return axiosClient.post(url, data);
    },
};

export default deliveryApi;
