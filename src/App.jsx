// import logo from './logo.svg';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import ProductFeature from './features/Product';
import ChatFeature from './features/Chat';
import Login from './features/Auth/components/Login';
import Register from './features/Auth/components/Register';

import UserFeature from './features/User';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Routes>
                    <Route path="*" element={<ProductFeature />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="chat" element={<ChatFeature />} />
                    <Route path="user/*" element={<UserFeature />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
