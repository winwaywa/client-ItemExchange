import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@mui/material';

ProductSort.propTypes = {};

function ProductSort({ currentSort, onChange }) {
    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <div className="product__sort">
            <Tabs
                value={currentSort}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab value="createdAt:DESC" label="Mới nhất" />
                <Tab value="price:ASC" label="Giá thấp tới cao" />
                <Tab value="price:DESC" label="Giá cao tới thấp" />
            </Tabs>
        </div>
    );
}

export default ProductSort;
