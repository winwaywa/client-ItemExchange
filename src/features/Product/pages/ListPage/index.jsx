import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProductApi from '../../../../api/productApi';
import ProductFilters from '../../components/ProductFilters';
import ProductList from '../../components/ProductList';

ListPage.propTypes = {};

function ListPage(props) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await ProductApi.getAllProducts();
            setProducts(data.products);
        })();
    }, []);
    return (
        <div className="product__list">
            <ProductFilters />
            <ProductList products={products} />
        </div>
    );
}

export default ListPage;
