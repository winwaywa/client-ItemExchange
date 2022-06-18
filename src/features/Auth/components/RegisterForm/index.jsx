import '../styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../../components/form-controll/InputField';
import PasswordField from '../../../../components/form-controll/PasswordField';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit, isLoading }) {
    // validate vs yup
    const schema = yup
        .object()
        .shape({
            username: yup
                .string()
                .required('Tên tài khoản không được để trống')
                .min(4, 'Tên tài khoản ít nhất 4 kí tự')
                .max(12, 'Tên tài khoản nhiều nhất 12 kí tự')
                .test(
                    'username',
                    'Tên tài khoản không được có khoảng trắng',
                    (value) => value.split(' ').length === 1 // hàm tự đặt
                ),
            password: yup
                .string()
                .required('Mật khẩu không được để trống')
                .min(6, 'Mật khẩu ít nhất 6 kí tự'),
            retypePassword: yup
                .string()
                .required('Nhập lại mật khẩu của bạn')
                .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không giống nhau'),
        })
        .required();

    //form
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            retypePassword: '',
        },
        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        if (onSubmit) onSubmit(values);
        //reset form sau khi submit xong
        form.reset();
    };

    return (
        <form className="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="form__heading"></div>
            <div className="form__content">
                <InputField form={form} name="username" label="Tên tài khoản" />
                <PasswordField form={form} name="password" label="Mật khẩu" />
                <PasswordField form={form} name="retypePassword" label="Nhập lại Mật khẩu" />

                {!isLoading && (
                    <input
                        className="btn btn--primary btn--register"
                        type="submit"
                        value="Đăng ký"
                    />
                )}
                {isLoading && (
                    <input
                        className="btn btn--primary btn--register disabled"
                        type="submit"
                        value="Đăng ký"
                        disabled
                    />
                )}
                <p>
                    Đã có tài khoản?&nbsp;
                    <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </form>
    );
}

export default RegisterForm;
