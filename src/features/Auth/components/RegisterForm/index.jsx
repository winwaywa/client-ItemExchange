import '../styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSubmit = (e, values) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form
            className="form"
            onSubmit={(e) => handleSubmit(e, { username, password, retypePassword })}
        >
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
                <input
                    className="form__input"
                    type="password"
                    name="retype-password"
                    id="retype-password"
                    placeholder="Nhập lại mật khẩu..."
                    onChange={(e) => setRetypePassword(e.target.value)}
                />
                <input className="btn btn--primary btn--register" type="submit" value="Đăng ký" />
                <p>
                    Đã có tài khoản?&nbsp;
                    <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </form>
    );
}

export default RegisterForm;
