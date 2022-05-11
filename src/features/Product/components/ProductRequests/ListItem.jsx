import React from 'react';
import PropTypes from 'prop-types';

ListItem.propTypes = {};

function ListItem({ products, handleClose, handleConfirm }) {
    return (
        <ul>
            {products &&
                products.map((product) => (
                    <li key={product._id} styles={{ display: 'flex' }}>
                        {product.product_name}
                        <a
                            href="#"
                            className="btn-text"
                            onClick={() => {
                                handleClose();
                                handleConfirm(product._id);
                            }}
                        >
                            Chọn
                        </a>
                    </li>
                ))}
        </ul>
    );
}

export default ListItem;
