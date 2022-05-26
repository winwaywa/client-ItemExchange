import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Auth/userSlice';

import AdminNav from './components/AdminNav';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';

import NotFound from '../../components/NotFound';

AdminFeature.propTypes = {};

function AdminFeature(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        const action = logout();
        dispatch(action);
        navigate('/login');
    };

    return (
        <section className="admin">
            <nav className="nav">
                <AdminNav handleLogout={handleLogout} />
            </nav>
            <div className="admin__main">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="post" element={<PostPage />} />
                    <Route path="category" element={<CategoryPage />} />
                </Routes>
            </div>
        </section>
    );
}

export default AdminFeature;
