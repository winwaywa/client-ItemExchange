import axiosClient from './axiosClient';

const mailApi = {
    sendMailNotification(data) {
        const url = '/mail/notification';
        return axiosClient.post(url, data);
    },
};

export default mailApi;
