import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './FilterByCategory';
import FilterByProvince from './FilterByProvince';
import FilterByPrice from './FilterByPrice';
import FilterByPercentNew from './FilterByPercentNew';

ProductsFilters.propTypes = {};

function ProductsFilters({ filters, onChange }) {
    const handleChange = (values) => {
        if (onChange) {
            const newFilters = {
                ...filters,
                ...values,
            };
            onChange(newFilters);
        }
    };

    return (
        <div className="product__filter">
            <FilterByCategory onChange={handleChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByPercentNew onChange={handleChange} />
            <FilterByProvince onChange={handleChange} />
        </div>
    );
}

export default ProductsFilters;
