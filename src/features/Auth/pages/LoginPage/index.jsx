import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import LoginForm from '../../components/LoginForm';
import { login, loginWithGoogle } from '../../userSlice';

LoginPage.propTypes = {};

function LoginPage(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            setIsLoading(false);
            navigate(`/${user.username}/about`);
            swal(
                'Đăng nhập thành công',
                `Chào mừng ${user.username} đến với chợ đồ cũ!`,
                'success'
            );
        } catch (err) {
            setIsLoading(false);
            console.log('ERROR:', err);
            swal('Đăng nhập thất bại', `${err.message}!`, 'error');
        }
    };

    const handleLoginWithGoogle = async (credential) => {
        try {
            setIsLoading(true);
            const action = loginWithGoogle({ credential });
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            setIsLoading(false);
            navigate(`/${user.username}/about`);
            swal(
                'Đăng nhập thành công',
                `Chào mừng ${user.username} đến với chợ đồ cũ!`,
                'success'
            );
        } catch (err) {
            setIsLoading(false);
            console.log('ERROR:', err);
            swal('Đăng nhập thất bại', `${err.message}!`, 'error');
        }
    };

    return (
        <div>
            <LoginForm
                onSubmit={handleSubmit}
                handleLoginWithGoogle={handleLoginWithGoogle}
                isLoading={isLoading}
            />
        </div>
    );
}

export default LoginPage;
