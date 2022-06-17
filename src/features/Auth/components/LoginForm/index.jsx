import '../styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../../components/form-controll/InputField';
import PasswordField from '../../../../components/form-controll/PasswordField';

import userApi from '../../../../api/userApi';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit, handleLoginWithGoogle }) {
    //yup
    const schema = yup
        .object({
            username: yup
                .string()
                .required('Tên tài khoản không được để trống')
                .min(4, 'Tên tài khoản ít nhất 4 kí tự')
                .test(
                    'username',
                    'Tên tài khoản không được có khoảng trắng',
                    (value) => value.split(' ').length === 1 // hàm tự đặt
                ),
            // .test('existUsername', 'Tên tài khoản đã tồn tại', function (value) {
            //     ( () => {
            //         return new Promise((resolve, reject) => {
            //             const { user } = userApi.getUserByUserName(value);
            //         })
            //             .then((res) => {
            //                 resolve(true);
            //             })
            //             .catch((err) => {
            //                 resolve(false);
            //             });
            //     })();
            // }),
            password: yup
                .string()
                .required('Mật khẩu không được để trống')
                .min(6, 'Mật khẩu ít nhất 6 kí tự'),
        })
        .required();

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema), //đem yup vào trong form bằng resolver
    });

    //action
    const handleSubmit = (values) => {
        console.log(values);
        if (onSubmit) onSubmit(values);
    };
    const handleResponseGoogle = async (response) => {
        const { credential } = response;
        // https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=credential sẽ trả về thông tin gmail
        handleLoginWithGoogle(credential);
    };

    return (
        <form className="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="form__heading"></div>
            <div className="form__content">
                <InputField name="username" label="Tên tài khoản" form={form} />
                <PasswordField name="password" label="Mật khẩu" form={form} />
                <div style={{ margin: '1rem 0' }}>
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
                    <label htmlFor="remember">Ghi Nhớ</label>
                </div>
                <input className="btn btn--primary" type="submit" value="Đăng nhập" />
                <p
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Hoặc
                </p>
                <div
                    style={{
                        padding: '0px',
                        textAlign: 'center',
                        marginBottom: '0',
                    }}
                >
                    <GoogleLogin
                        onSuccess={handleResponseGoogle}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </div>
                <p>
                    Quên?&nbsp;
                    <Link to="/forgot">Mật khẩu</Link>
                </p>
                <p>
                    Chưa có tài khoản?&nbsp;
                    <Link to="/register">Đăng ký</Link>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;
