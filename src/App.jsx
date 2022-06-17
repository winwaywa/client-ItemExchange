import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './features/Auth/userSlice';

import Header from './components/Header';
import Footer from './components/Footer';

import ProductFeature from './features/Product';
import LoginPage from './features/Auth/pages/LoginPage';
import RegisterPage from './features/Auth/pages/RegisterPage';
import About from './components/About';

import ChatFeature from './features/Chat';
import UserFeature from './features/User';
import AdminFeature from './features/Admin';

import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    useEffect(() => {
        (() => {
            try {
                const access_token = localStorage.getItem('access_token');
                const decodedJwt = parseJwt(access_token);
                console.log(
                    'Số ngày ghi nhớ tk , mk:',
                    (decodedJwt.exp * 1000 - Date.now()) / (24 * 60 * 60 * 1000)
                );
                // hết hạn nhớ thì login lại
                if (decodedJwt.exp * 1000 < Date.now()) {
                    dispatch(logout());
                    navigate('/login');
                }
            } catch (err) {
                dispatch(logout());
            }
        })();
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="main">
                <Routes>
                    <Route path="" element={<ProductFeature />} />
                    <Route path="products/*" element={<ProductFeature />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="about" element={<About />} />

                    <Route path="admin/*" element={<AdminFeature />} />
                    <Route path=":username/*" element={<UserFeature />} />
                    <Route path="message/*" element={<ChatFeature />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
