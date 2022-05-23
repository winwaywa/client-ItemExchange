import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import LoginForm from '../LoginForm';
import { login, loginWithGoogle } from '../../userSlice';

Login.propTypes = {};

function Login(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            navigate('/user/me');
            swal(
                'Đăng nhập thành công',
                `Chào mừng ${user.username} đến với chợ đồ cũ!`,
                'success'
            );
        } catch (err) {
            console.log('ERROR:', err);
            swal('Đăng nhập thất bại', `${err.message}!`, 'error');
        }
    };

    const handleLoginWithGoogle = async (credential) => {
        try {
            const action = loginWithGoogle({ credential });
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            navigate('/user/me');
            swal(
                'Đăng nhập thành công',
                `Chào mừng ${user.username} đến với chợ đồ cũ!`,
                'success'
            );
        } catch (err) {
            console.log('ERROR:', err);
            swal('Đăng nhập thất bại', `${err.message}!`, 'error');
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} handleLoginWithGoogle={handleLoginWithGoogle} />
        </div>
    );
}

export default Login;
