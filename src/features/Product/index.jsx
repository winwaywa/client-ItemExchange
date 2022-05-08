import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
    return (
        <div className="products">
            <Routes>
                <Route path="*" element={<ListPage />} />
                <Route path="products" element={<ListPage />} />
                <Route path="products/:id" element={<DetailsPage />} />
            </Routes>
        </div>
    );
}

export default ProductFeature;
