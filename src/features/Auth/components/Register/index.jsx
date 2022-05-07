import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import RegisterForm from '../RegisterForm';
import { register } from '../../userSlice';

Register.propTypes = {};

function Register(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            console.log(values);
            //Mới validate lỗi ở server
            if (values.password !== values.retypePassword)
                throw new Error('Mật khẩu nhập lại không khớp!');
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            navigate('/user/me');
            enqueueSnackbar('Đăng kí thành công', { variant: 'success' });
        } catch (err) {
            console.log('ERROR:', err);
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
