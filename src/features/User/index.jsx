import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Auth/userSlice';

import InfoPage from './pages/InfoPage';
import PostPage from './pages/PostPage';
import UserNav from './components/UserNav';
import RequestPage from './pages/RequestPage';

import NotFound from '../../components/NotFound';
// import { googleLogout } from '@react-oauth/google';

UserFeature.propTypes = {};

function UserFeature(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        const action = logout();
        dispatch(action);
        // googleLogout();
        navigate('/login');
    };

    return (
        <section className="user">
            <nav className="nav">
                <UserNav handleLogout={handleLogout} />
            </nav>
            <div className="user__main">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="me" element={<InfoPage />} />
                    <Route path="post" element={<PostPage />} />
                    <Route path="requests" element={<RequestPage />} />
                </Routes>
            </div>
        </section>
    );
}

export default UserFeature;
