import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
Login.propTypes = {};

function Login(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);

    dispatch(login(values));

    navigate('/products');
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
