import './styles.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../../components/form-controll/InputField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

InfoForm.propTypes = {};

function InfoForm({ user = {}, provinces, handleUpdateUser }) {
    const [province, setProvince] = useState(user?.province);
    // validate vs yup
    const schema = yup
        .object()
        .shape({
            full_name: yup
                .string()
                .required('Tên đầy đủ không được để trống !')
                .min(3, 'Tên quá ngắn')
                .max(20, 'Tên đầy đủ nhiều nhất 20 kí tự'),
            phone: yup
                .string()
                .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    'Số điện thoại không hợp lệ'
                ),
            email: yup.string().required('Email không được để trống !').email('Email không hợp lệ'),
            address: yup.string().required('Nhập địa chỉ cụ thể của bạn'),
        })
        .required();

    //form
    const form = useForm({
        defaultValues: {
            full_name: user.full_name,
            phone: user.phone,
            email: user.email,
            address: user.address,
        },
        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        console.log('alo', values);
        const newData = {
            ...values,
            province,
        };
        if (handleUpdateUser) handleUpdateUser(newData);
    };

    return (
        <form className="user__form" onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField form={form} name="full_name" label="Họ Tên" />
            <InputField form={form} name="phone" label="Số điện thoại" />
            <InputField form={form} name="email" label="Email" />
            <InputField form={form} name="address" label="Địa chỉ" />
            <Autocomplete
                disablePortal
                id="combo-box-provinces"
                options={provinces}
                sx={{
                    marginBottom: '1.5rem',
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} label={province} />}
                onChange={(e, newValue) => {
                    setProvince(newValue);
                }}
            />
            <button className="btn btn--primary btn--small">Cập nhật</button>
        </form>
    );
}

export default InfoForm;
