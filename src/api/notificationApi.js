import axiosClient from './axiosClient';

const notificationApi = {
    getNotificationsByUser(queryParams) {
        const url = '/notifications';
        return axiosClient.get(url, { params: queryParams });
    },
    createNotification(data) {
        const url = '/notifications';
        return axiosClient.post(url, data);
    },
    updateStatusSeen(id, data) {
        const url = `/notifications/${id}`;
        return axiosClient.put(url, data);
    },
};

export default notificationApi;
