import axiosClient from './axiosClient';

const conversationApi = {
    getConversationsByUser() {
        const url = '/conversation';
        return axiosClient.get(url);
    },
    openConversation(data) {
        const url = `/conversation`;
        return axiosClient.post(url, data);
    },
    closeConversation(data) {
        const url = `/conversation`;
        return axiosClient.put(url, data);
    },
};

export default conversationApi;
