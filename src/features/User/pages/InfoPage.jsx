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
                console.log('Chưa khắc phục cái useEffect 2 lần(do IIFE)');
                setUser(data.user);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleUpdateUser = async (data) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn cập nhật thông tin của mình?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const user = await userApi.updateUser(data);
                if (!user) {
                    throw new Error('Cập nhật thất bại!');
                }
                //cập nhật user ở redux
                const action = updateUser({
                    username: user.user.username,
                    avatar: user.user.avatar,
                });
                dispatch(action);
                swal('Thành công', 'Cập nhật thông tin thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    return (
        <div className="user__info">
            {user && <UserInfo user={user} handleUpdateUser={handleUpdateUser} />}
        </div>
    );
}

export default InfoPage;
