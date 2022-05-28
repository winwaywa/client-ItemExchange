import './styles.scss';
import { useMemo } from 'react';
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
                {day < 1 && <i className="product__new">New</i>}
                <img
                    className="product__img"
                    src={product.images_url.split(',')[0]}
                    alt={product.product_name}
                />
            </div>
            <div className="product__text">
                <p className="product__name">{product.product_name}</p>
                <strong className="product__price">{formatPrice(product.price)}</strong>
            </div>
        </>
    );
}

export default ProductItem;
