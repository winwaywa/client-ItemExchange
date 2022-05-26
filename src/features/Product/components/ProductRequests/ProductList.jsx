import React from 'react';
import PropTypes from 'prop-types';

ProductList.propTypes = {};

function ProductList({ products, handleClose, handleConfirm }) {
    return (
        <ul style={{ listStyle: 'square' }}>
            <h3 className="heading-tertiary">Đồ của bạn</h3>
            {products &&
                products.map((product) => (
                    <li key={product._id}>
                        {product.product_name}
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
