import axiosClient from './axiosClient';

const transactionApi = {
    getTransactionsWithCondition(queryParams) {
        const url = '/transactions';
        return axiosClient.get(url, { params: queryParams });
    },
    createTransaction(data) {
        const url = '/transactions';
        return axiosClient.post(url, data);
    },
};

export default transactionApi;
