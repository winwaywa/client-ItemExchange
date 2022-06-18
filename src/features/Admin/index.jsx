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
import TransactionPage from './pages/TransactionPage';
import DeliveryPage from './pages/DeliveryPage';

AdminFeature.propTypes = {};

function AdminFeature(props) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const { user } = await userApi.getUser();
                const isTrue = user.role === 'admin' ? true : false;
                if (!isTrue) navigate(`/${user.username}`, { replace: true });
                setIsAdmin(isTrue);
            } catch (err) {
                navigate('/');
            }
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
                            <Route path="transactions" element={<TransactionPage />} />
                            <Route path="delivery" element={<DeliveryPage />} />
                            <Route path="category" element={<CategoryPage />} />
                        </Routes>
                    </div>
                </section>
            )}
        </>
    );
}

export default AdminFeature;
