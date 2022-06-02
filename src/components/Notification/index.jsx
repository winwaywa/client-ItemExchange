import './styles.scss';
import { useState, useEffect } from 'react';
import notificationApi from '../../api/notificationApi';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { updateNotification } from '../../features/Auth/userSlice';

import PropTypes from 'prop-types';
Notification.propTypes = {};

function Notification(props) {
    const dispatch = useDispatch();
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        (async () => {
            const notifications = await notificationApi.getNotificationsByUser({ seen: false });
            setNotificationList(notifications.notifications);
            dispatch(updateNotification(notifications['notifications'].length));
        })();

        setInterval(async () => {
            console.log('Đang gọi api lấy thông báo!');
            const notifications = await notificationApi.getNotificationsByUser({ seen: false });
            setNotificationList(notifications.notifications);
            dispatch(updateNotification(notifications['notifications'].length));
        }, 30000);

        return () => clearInterval();
    }, []);

    const handleClickSeen = async (notification_id) => {
        try {
            //update db
            const notification = await notificationApi.updateStatusSeen(notification_id, {
                seen: true,
            });
            if (!notification) throw Error('Cập nhật notification thất bại!');
            //update redux
            dispatch(updateNotification(notificationList.length - 1));
            //update state

            setNotificationList((preValue) => [
                ...preValue.filter((x) => x._id !== notification_id),
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="notification__box">
            <h3 className="heading--tertiary notification__heading">Thông báo chưa đọc</h3>
            <ul className="notification__list">
                {notificationList.map((notification) => (
                    <li key={notification._id} className="notification__item">
                        <div className="notification__text">
                            <p>{notification.text}</p>
                            {notification.seen || (
                                <i
                                    className="notification__status"
                                    onClick={() => handleClickSeen(notification._id)}
                                ></i>
                            )}
                        </div>
                        <p className="notification__timeline">
                            {moment(notification.createdAt).startOf('minutes').fromNow()}
                        </p>
                    </li>
                ))}
            </ul>
            <p style={{ textAlign: 'center' }}>
                <a href="#">Xem tất cả</a>
            </p>
        </div>
    );
}

export default Notification;
