import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import NotFound from '../../components/NotFound';

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

    //Update User
    const handleUpdateUser = async ({ file, url }) => {
        const newValue = { ...user, avatar: file };
        try {
            const user = await userApi.updateUser(newValue);
            if (!user) {
                throw new Error('Cập nhật thất bại!');
            }
            //cập nhật lại trang
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
                handleUpdateUser={handleUpdateUser}
            />
            <div className="user__main">
                {/* Check xem trang user đó phải của mình không */}
                {user.username === me.username && (
                    <div className="user__me">
                        <Routes>
                            <Route path="" element={<PostPage />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="requests" element={<RequestPage />} />
                            <Route path="transactions" element={<TransactionPage user={user} />} />
                        </Routes>
                    </div>
                )}
                {user.username !== me.username && <GuessPage user={user} />}
            </div>
        </section>
    );
}

export default UserFeature;
