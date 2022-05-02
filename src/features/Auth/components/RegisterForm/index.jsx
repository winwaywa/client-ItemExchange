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
      <h2>Register</h2>
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
      <input
        className="form__input"
        type="password"
        name="retype-password"
        id="retype-password"
        placeholder="Retype password"
        onChange={(e) => setRetypePassword(e.target.value)}
      />
      <input className="btn btn--primary" type="submit" value="Register" />
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Login now</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
