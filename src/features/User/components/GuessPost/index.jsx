import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';
GuessPost.propTypes = {};

function GuessPost({ productList }) {
    return (
        <div className="guess__post">
            <div className="product__list">
                {productList.map((product) => (
                    <Link
                        className="product__item"
                        to={`/products/${product._id}`}
                        key={product._id}
                    >
                        <div className="product__thumbnail">
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
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GuessPost;
