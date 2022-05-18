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
    updateTransaction(id, data) {
        const url = `/transactions/${id}`;
        return axiosClient.put(url, data);
    },
    deleteTransaction(queryParams) {
        const url = `/transactions`;
        return axiosClient.delete(url, { params: queryParams });
    },
};

export default transactionApi;
