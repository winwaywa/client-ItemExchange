import './styles.scss';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../../utils';
import moment from 'moment';

ProductItem.propTypes = {};

function ProductItem({ product }) {
    const day = useMemo(() => {
        //tính thời gian tạo bài viết so với hiện tại
        const miliseconds = Number(Number(new Date()) - new Date(product.createdAt));
        const day = miliseconds / (24 * 60 * 60 * 1000);
        return day;
    }, [product]);

    return (
        <>
            <div className="product__thumbnail">
                {day < 1 && <p className="new">New</p>}
                {product.images_url && (
                    <img src={product.images_url.split(',')[0]} alt={product.product_name} />
                )}
                <Link className="btn-details" to={`/products/${product._id}`}>
                    Chi tiết
                </Link>
            </div>
            <Link className="product__link" to={`/products/${product._id}`}>
                <h4>
                    {product.product_name}
                    <p>{formatPrice(product.price)}</p>
                </h4>
            </Link>
        </>
    );
}

export default ProductItem;
