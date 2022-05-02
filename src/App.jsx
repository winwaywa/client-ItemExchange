// import logo from './logo.svg';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import Login from './features/Auth/components/Login';
import Register from './features/Auth/components/Register';

import DetailsPage from './features/Product/pages/DetailsPage';
import ListPage from './features/Product/pages/ListPage';
import UserFeature from './features/User';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="products" element={<ListPage />} />
          <Route path="products/:id" element={<DetailsPage />} />

          <Route path="user/*" element={<UserFeature />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
