import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';

import GuessPage from './pages/GuessPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import RequestPage from './pages/RequestPage';
import TransactionPage from './pages/TransactionPage';

import userApi from '../../api/userApi';

import { updateUser } from '../Auth/userSlice';
import { logout } from '../Auth/userSlice';
// import { googleLogout } from '@react-oauth/google';

import PropTypes from 'prop-types';
import DeliveryPage from './pages/DeliveryPage';

UserFeature.propTypes = {};

function UserFeature(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username } = useParams();
    const loggedUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedUser;

    const [me, setMe] = useState({});
    const [user, setUser] = useState({});
    console.log(user);

    useEffect(() => {
        (async () => {
            const user = await userApi.getUserByUserName(username);
            setUser(user.user);
            //check có đăng nhập chưa, có thì gọi api lấy thông tin của mình
            if (isLoggedIn) {
                const me = await userApi.getUser();
                setMe(me.user);
            }
        })();
    }, [username]);
    console.log({ me, user });

    //Update avatar
    const handleUpdateAvatar = async ({ file, url }) => {
        const newValue = { ...user, avatar: file };
        try {
            const user = await userApi.updateUser(newValue);
            if (!user) {
                throw new Error('Cập nhật thất bại!');
            }
            //cập nhật lại avatar ở client
            setUser((newValue) => ({ ...newValue, avatar: url }));
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
    };

    //Update user
    const handleUpdateUser = async (data) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn cập nhật thông tin của mình?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const { user } = await userApi.updateUser(data);
                if (!user) {
                    throw new Error('Cập nhật thất bại!');
                }
                setUser({ ...user });
                swal('Thành công', 'Cập nhật thông tin thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    //logout
    const handleLogout = (e) => {
        e.preventDefault();
        const action = logout();
        dispatch(action);
        // googleLogout();
        navigate('/login');
    };

    return (
        <section className="user">
            <Header
                user={user}
                me={me}
                handleLogout={handleLogout}
                handleUpdateAvatar={handleUpdateAvatar}
            />
            <div className="user__main">
                {/* Check xem trang user đó phải của mình không */}
                {user.username === me.username && (
                    <div className="user__me">
                        <Routes>
                            <Route path="" element={<PostPage />} />
                            <Route
                                path="about"
                                element={
                                    <AboutPage user={user} handleUpdateUser={handleUpdateUser} />
                                }
                            />
                            <Route path="requests" element={<RequestPage />} />
                            <Route path="transactions" element={<TransactionPage user={user} />} />
                            <Route path="delivery" element={<DeliveryPage />} />
                        </Routes>
                    </div>
                )}
                {user.username !== me.username && <GuessPage user={user} />}
            </div>
        </section>
    );
}

export default UserFeature;
