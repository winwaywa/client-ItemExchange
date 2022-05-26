import '../styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit, handleLoginWithGoogle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const handleSubmit = (e, values) => {
        e.preventDefault();
        onSubmit(values);
    };

    const handleResponseGoogle = async (response) => {
        const { credential } = response;
        // https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=credential sẽ trả về thông tin gmail
        handleLoginWithGoogle(credential);
    };

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e, { username, password })}>
            <div className="form__heading"></div>
            <div className="form__content">
                <input
                    className="form__input"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Tên tài khoản..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="form__input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mật khẩu..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="checkbox"
                        id="remember"
                        value="remember"
                        style={{
                            marginRight: '1rem',
                            height: '1rem',
                            width: '1rem',
                        }}
                        onChange={() => {
                            setIsRemember(!isRemember);
                        }}
                    />
                    <label htmlFor="remember">Ghi Nhớ</label>
                </div>
                <input className="btn btn--primary" type="submit" value="Đăng nhập" />
                <p
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Hoặc
                </p>
                <div
                    style={{
                        padding: '0px',
                        textAlign: 'center',
                        marginBottom: '0',
                    }}
                >
                    <GoogleLogin
                        onSuccess={handleResponseGoogle}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </div>
                <p>
                    Quên?&nbsp;
                    <Link to="/forgot">Mật khẩu</Link>
                </p>
                <p>
                    Chưa có tài khoản?&nbsp;
                    <Link to="/register">Đăng ký</Link>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;
