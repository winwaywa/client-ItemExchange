// import logo from './logo.svg';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import ProductFeature from './features/Product';
import ChatFeature from './features/Chat';
import Login from './features/Auth/components/Login';
import Register from './features/Auth/components/Register';

import UserFeature from './features/User';
import AdminFeature from './features/Admin';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Routes>
                    <Route path="admin/*" element={<AdminFeature />} />

                    <Route path="products/*" element={<ProductFeature />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="chat" element={<ChatFeature />} />
                    <Route path="user/*" element={<UserFeature />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
