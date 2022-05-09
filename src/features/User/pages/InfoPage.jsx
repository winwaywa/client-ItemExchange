import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../Auth/userSlice';

import UserInfo from '../components/UserInfo';
import userApi from '../../../api/userApi';
import { useSnackbar } from 'notistack';
InfoPage.propTypes = {};

function InfoPage(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            try {
                //call API lấy thông tin user
                const data = await userApi.getUser();
                console.log('Chưa khắc phục cái useEffect 2 lần');
                setUser(data.user);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleUpdateUser = async (data) => {
        try {
            const user = await userApi.updateUser(data);
            if (!user) {
                throw new Error('Cập nhật thất bại!');
            }

            //cập nhật user ở redux
            const action = updateUser({ username: user.user.username, avatar: user.user.avatar });
            dispatch(action);

            enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    return (
        <div className="user__info">
            {user && <UserInfo user={user} handleUpdateUser={handleUpdateUser} />}
        </div>
    );
}

export default InfoPage;
