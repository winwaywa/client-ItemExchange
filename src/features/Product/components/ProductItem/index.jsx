import './styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../../utils';
ProductItem.propTypes = {};

function ProductItem({ product }) {
    return (
        <Link to={`/products/${product._id}`}>
            <img src="#" alt={product.product_name} />
            <h4>{product.product_name}</h4>
            <p>{formatPrice(product.price)}</p>
        </Link>
    );
}

export default ProductItem;
