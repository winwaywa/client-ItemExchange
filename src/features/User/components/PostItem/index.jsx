import React from 'react';
import PropTypes from 'prop-types';

PostItem.propTypes = {};

function PostItem({ product }) {
    return <div>{product.product_name}</div>;
}

export default PostItem;
