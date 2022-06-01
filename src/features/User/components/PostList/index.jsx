import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../../../../images/icon-svg/delete-icon.svg';
import EditIcon from '../../../../../images/icon-svg/edit-icon.svg';
import LookIcon from '../../../../../images/icon-svg/look-icon.svg';

PostList.propTypes = {};

function PostList({ productList, handleDeletePost }) {
    const handleClickDelete = (product_id) => {
        handleDeletePost(product_id);
    };

    return (
        <ul className="post__list">
            {productList.map((product) => (
                <li className="post__item" key={product._id}>
                    <img
                        className="post__img"
                        src={product.images_url.split(',')[0]}
                        alt={product.product_name}
                    />
                    <div className="post__action">
                        <Link to={`/products/${product._id}`}>
                            <img className="post__icon" src={LookIcon} alt="look-icon" />
                        </Link>
                        <img className="post__icon" src={EditIcon} alt="edit-icon" />
                        <img
                            className="post__icon"
                            src={DeleteIcon}
                            alt="delete-icon"
                            onClick={() => handleClickDelete(product._id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PostList;
