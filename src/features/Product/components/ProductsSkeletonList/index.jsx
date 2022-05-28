import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';

ProductsSkeletonList.propTypes = {
    length: PropTypes.number,
};

ProductsSkeletonList.defaultProps = {
    length: 6,
};

function ProductsSkeletonList({ length }) {
    return (
        <div className="product__list">
            {Array.from(new Array(length)).map((x, index) => (
                <div key={index} className="product__item">
                    <div className="product__thumbnail">
                        <Skeleton variant="rectangular" width="100%" height={100} />
                    </div>
                    <div className="product__text">
                        <Skeleton />
                        <Skeleton width="60%" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductsSkeletonList;
