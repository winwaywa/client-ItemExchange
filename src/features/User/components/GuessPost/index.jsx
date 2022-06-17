import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';
GuessPost.propTypes = {};

function GuessPost({ productList }) {
    return (
        <div style={{ minHeight: '20rem', backgroundColor: '#fff' }} className="guess__post">
            <h3
                className="heading-tertiary"
                style={{ borderBottom: '1px solid rgb(220, 220, 220)', marginBottom: '1rem' }}
            >
                Bài viết
            </h3>
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
                            <strong className="product__price">{formatPrice(product.price)}</strong>
                        </div>
                        <p className="product__name">{product.product_name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GuessPost;
