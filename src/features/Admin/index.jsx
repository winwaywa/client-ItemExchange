import './styles.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AdminNav from './components/AdminNav';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';

import userApi from '../../api/userApi';

AdminFeature.propTypes = {};

function AdminFeature(props) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        (async () => {
            const { user } = await userApi.getUser();
            const isTrue = user.role === 'admin' ? true : false;
            if (!isTrue) navigate(`/${user.username}`, { replace: true });
            setIsAdmin(isTrue);
        })();
    }, []);

    return (
        <>
            {isAdmin && (
                <section className="admin">
                    <AdminNav />
                    <div className="admin__main">
                        <Routes>
                            <Route path="*" element={<Dashboard />} />
                            <Route path="user" element={<UserPage />} />
                            <Route path="post" element={<PostPage />} />
                            <Route path="category" element={<CategoryPage />} />
                        </Routes>
                    </div>
                </section>
            )}
        </>
    );
}

export default AdminFeature;
