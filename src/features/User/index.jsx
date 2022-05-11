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

UserFeature.propTypes = {};

function UserFeature(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        const action = logout();
        dispatch(action);
        navigate('/login');
    };

    return (
        <section className="user">
            <nav className="nav">
                <UserNav handleLogout={handleLogout} />
            </nav>
            <div className="user__main">
                <Routes>
                    <Route path="me" element={<InfoPage />} />
                    <Route path="post" element={<PostPage />} />
                    <Route path="requests" element={<RequestPage />} />
                </Routes>
            </div>
        </section>
    );
}

export default UserFeature;
