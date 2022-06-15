import React from 'react';
import PropTypes from 'prop-types';

ProductList.propTypes = {};

function ProductList({ products, handleClose, handleConfirm }) {
    return (
        <ul style={{ minHeight: '20rem' }}>
            <h3 className="heading-tertiary">Đồ của bạn</h3>
            {products &&
                products.map((product) => (
                    <li
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                        }}
                        key={product._id}
                    >
                        <span>{product.product_name}</span>
                        <button
                            href="#"
                            style={{ marginLeft: '1rem' }}
                            className="btn btn--small btn--success"
                            onClick={() => {
                                handleClose();
                                handleConfirm(product._id);
                            }}
                        >
                            Chọn
                        </button>
                    </li>
                ))}
        </ul>
    );
}

export default ProductList;
