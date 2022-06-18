import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import RegisterForm from '../../components/RegisterForm';
import { register } from '../../userSlice';

RegisterPage.propTypes = {};

function RegisterPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            console.log(values);
            //Mới validate lỗi ở server
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            setIsLoading(false);
            navigate(`/${user.username}/about`);
            swal('Đăng kí thành công', 'Vui lòng cập nhật thông tin cá nhân của bạn!', 'success');
        } catch (err) {
            setIsLoading(false);
            console.log('ERROR:', err);
            swal('Đăng kí thất bại', `${err.message}!`, 'error');
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}

export default RegisterPage;
