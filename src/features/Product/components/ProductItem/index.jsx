import './styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../../utils';
ProductItem.propTypes = {};

function ProductItem({ product }) {
    return (
        <>
            <div className="product__thumbnail">
                {product.images_url && (
                    <img src={product.images_url.split(',')[0]} alt={product.product_name} />
                )}
                <Link className="btn-details" to={`/products/${product._id}`}>
                    Chi tiết
                </Link>
            </div>
            <Link className="product__link" to={`/products/${product._id}`}>
                <h4>{product.product_name}</h4>
                <p>{formatPrice(product.price)}</p>
            </Link>
        </>
    );
}

export default ProductItem;
