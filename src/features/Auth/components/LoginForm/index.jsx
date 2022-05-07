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
            <h2>Login</h2>
            <input
                className="form__input"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
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
                <label for="remember">Remember Me</label>
            </div>
            <input className="btn btn--primary" type="submit" value="Login" />
            <p>
                Forgot?&nbsp;
                <Link to="/forgot">Password</Link>
            </p>
            <p>
                Don't have an account?&nbsp;
                <Link to="/register">Register now</Link>
            </p>
        </form>
    );
}

export default LoginForm;
