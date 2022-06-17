import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import LookIcon from '../../../images/icon-svg/look-icon.svg';
import HiddenIcon from '../../../images/icon-svg/hidden-icon.svg';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

PasswordField.propTypes = {};

function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { control } = form;

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, error },
            }) => (
                <>
                    <FormControl
                        error={isTouched && invalid}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        <InputLabel>{label}</InputLabel>
                        <OutlinedInput
                            id={name}
                            error={invalid}
                            type={showPassword ? 'text' : 'password'}
                            label={label}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <img
                                                style={{ filter: 'invert(0.3)' }}
                                                src={LookIcon}
                                                alt="look-icon"
                                            />
                                        ) : (
                                            <img
                                                style={{ filter: 'invert(0.3)' }}
                                                src={HiddenIcon}
                                                alt="hidden-icon"
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputProps={{ style: { fontSize: 14 } }}
                        />
                    </FormControl>
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </>
            )}
        />
    );
}

export default PasswordField;
