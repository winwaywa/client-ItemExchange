import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { control } = form;
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { invalid, error },
            }) => (
                <TextField
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    label={label}
                    error={invalid}
                    helperText={error?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    disabled={disabled}
                    inputProps={{ style: { fontSize: 14 } }}
                />
            )}
        />
    );
}

export default InputField;
