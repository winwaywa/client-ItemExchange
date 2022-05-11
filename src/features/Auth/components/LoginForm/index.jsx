import '../styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const handleSubmit = (e, values) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e, { username, password })}>
            <h2>Đăng nhập</h2>
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
            <div style={{ padding: '0' }}>
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
            <p>
                Quên?&nbsp;
                <Link to="/forgot">Mật khẩu</Link>
            </p>
            <p>
                Chưa có tài khoản?&nbsp;
                <Link to="/register">Đăng ký</Link>
            </p>
        </form>
    );
}

export default LoginForm;
