import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import NotFound from '../../components/NotFound';

import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import RequestPage from './pages/RequestPage';

import userApi from '../../api/userApi';

import { updateUser } from '../Auth/userSlice';

import PropTypes from 'prop-types';
import GuessPage from './pages/GuessPage';

// import { googleLogout } from '@react-oauth/google';
import { logout } from '../Auth/userSlice';
import { Value } from 'sass';

UserFeature.propTypes = {};

function UserFeature(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username } = useParams();
    const loggedUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedUser;

    const [me, setMe] = useState({});
    const [user, setUser] = useState({});

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
    const handleUpdateUser = async (data) => {
        const newValue = { ...me, ...data };
        console.log(newValue);
        // const willDelete = await swal({
        //     title: 'Xác nhận',
        //     text: 'Bạn chắc chắn muốn cập nhật thông tin của mình?',
        //     icon: 'warning',
        //     dangerMode: true,
        // });
        // if (willDelete) {
        //     try {
        //         const user = await userApi.updateUser(newValue);
        //         if (!user) {
        //             throw new Error('Cập nhật thất bại!');
        //         }
        //         //cập nhật lại trang
        //         // setUser((preValue) =>
        //         //     newValue;
        //         // );
        //         //cập nhật user ở redux
        //         const action = updateUser({
        //             username: user.user.username,
        //             avatar: user.user.avatar,
        //         });
        //         dispatch(action);
        //         swal('Thành công', 'Cập nhật thông tin thành công!', 'success');
        //     } catch (err) {
        //         swal('Thất bại', `${err.message}!`, 'error');
        //     }
        // }
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
                        </Routes>
                    </div>
                )}
                {user.username !== me.username && <GuessPage user={user} />}
            </div>
        </section>
    );
}

export default UserFeature;
