import React from 'react';
import PropTypes from 'prop-types';

FormValue.propTypes = {};

function FormValue({ handleClose, handleConfirm }) {
    const [price, setPrice] = React.useState();
    return (
        <div style={{ display: 'flex', marginTop: '2rem' }}>
            <input
                type="text"
                placeholder="Nhập số tiền"
                style={{
                    flex: 1,
                    padding: 10,
                    fontSize: '1.6rem',
                    outline: 'none',
                    border: '1px solid rgb(179, 176, 176)',
                    borderRadius: '5px',
                }}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                href="#"
                style={{ marginLeft: '1rem' }}
                className="btn btn--small btn--success"
                onClick={() => {
                    handleClose();
                    handleConfirm(price);
                }}
            >
                Gửi
            </button>
        </div>
    );
}

export default FormValue;
