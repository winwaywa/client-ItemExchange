import notificationApi from '../api/notificationApi';

export const sendNotification = async (user, text) => {
    try {
        await notificationApi.createNotification({ user, text });
    } catch (err) {
        console.log(err);
    }
};
