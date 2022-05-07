import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';
import { login } from '../../userSlice';

Login.propTypes = {};

function Login(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            navigate('/user/me');
            enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
        } catch (err) {
            console.log('ERROR:', err);
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;
