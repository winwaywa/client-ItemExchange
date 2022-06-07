import axiosClient from './axiosClient';

const messageApi = {
    getMessagesByConversation(id) {
        const url = `/message/${id}`;
        return axiosClient.get(url);
    },
    createMessage(data) {
        const url = `/message`;
        return axiosClient.post(url, data);
    },
};

export default messageApi;
