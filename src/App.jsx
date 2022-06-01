import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import ProductFeature from './features/Product';
import ChatFeature from './features/Chat';
import DeliveryFeature from './features/Delivery';
import Login from './features/Auth/components/Login';
import Register from './features/Auth/components/Register';

import UserFeature from './features/User';
import AdminFeature from './features/Admin';

import { checkPropTypes } from 'prop-types';

function App() {
    console.log('a');
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="products/*" element={<ProductFeature />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="admin/*" element={<AdminFeature />} />
                    <Route path=":username/*" element={<UserFeature />} />
                    <Route path="message" element={<ChatFeature />} />
                    <Route path="delivery" element={<DeliveryFeature />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
