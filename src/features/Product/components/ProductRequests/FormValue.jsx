import React from 'react';
import PropTypes from 'prop-types';

FormValue.propTypes = {};

function FormValue({ handleClose, handleConfirm }) {
    const [price, setPrice] = React.useState();
    return (
        <div>
            <input
                type="text"
                placeholder="Nhập số tiền"
                style={{ padding: 10, fontSize: 19, outline: 'none' }}
                onChange={(e) => setPrice(e.target.value)}
            />
            <a
                href="#"
                className="btn-text"
                onClick={() => {
                    handleClose();
                    handleConfirm(price);
                }}
            >
                Gửi
            </a>
        </div>
    );
}

export default FormValue;
