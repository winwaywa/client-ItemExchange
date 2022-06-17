import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../../components/form-controll/InputField';
import { formatPrice } from '../../../../utils';

FormValue.propTypes = {};

function FormValue({ product, handleClose, handleConfirm }) {
    // validate vs yup
    const schema = yup
        .object()
        .shape({
            price: yup
                .number()
                .typeError('Bắt buộc phải nhập số')
                .min(
                    product.price - product.price * 0.2,
                    `Giá không thể nhỏ hơn ${formatPrice(product.price - product.price * 0.2)}`
                )
                .max(
                    product.price + product.price * 0.2,
                    `Giá không thể lớn hơn ${formatPrice(product.price + product.price * 0.2)}`
                ),
        })
        .required();

    //form
    const form = useForm({
        defaultValues: {
            price: 0,
        },
        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = ({ price }) => {
        handleClose();
        handleConfirm(price);
        form.reset();
    };
    return (
        <form
            style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <InputField form={form} name="price" label="Giá tiền" />
            <button href="#" style={{ marginLeft: '1rem' }} className="btn btn--small btn--success">
                Gửi
            </button>
        </form>
    );
}

export default FormValue;
