import React, { useEffect, useState, useMemo } from 'react';
import swal from 'sweetalert';

import PostTable from '../PostTable';
import productApi from '../../../../api/productApi';
import PropTypes from 'prop-types';
PostList.propTypes = {};

function PostList({ products, tabIndex, handleDeleteProduct }) {
    const [state, setState] = useState('');

    const [productsFilter, setproductsFilter] = useState();

    useMemo(() => {
        setproductsFilter(products.filter((product) => product.status === state));
    }, [state, products]);

    useEffect(() => {
        switch (tabIndex) {
            case 0:
                setState('disable');
                break;
            case 1:
                setState('enable');
                break;
            case 2:
                setState('exchanging');
                break;
            case 3:
                setState('completed');
                break;
            default:
                return;
        }
    }, [tabIndex]);

    const handleClickDelete = (id) => {
        handleDeleteProduct(id);
    };

    return (
        <>
            {tabIndex === 0 && (
                <PostTable productsFilter={productsFilter} onDelete={handleClickDelete} />
            )}
        </>
    );
}

export default PostList;
