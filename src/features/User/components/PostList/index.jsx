import React, { useEffect, useState, useMemo } from 'react';

import TableNoApprove from '../PostTable/TableNoApprove';
import TableApprove from '../PostTable/TableApprove';
import PropTypes from 'prop-types';
PostList.propTypes = {};

function PostList({ products, transactions, tabIndex, handleDeleteProduct }) {
    console.log(transactions);
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
                setState('exchanged');
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
                <TableNoApprove productsFilter={productsFilter} onDelete={handleClickDelete} />
            )}
            {tabIndex === 1 && (
                <TableNoApprove productsFilter={productsFilter} onDelete={handleClickDelete} />
            )}
            {tabIndex === 2 && (
                <TableApprove
                    tabIndex={tabIndex}
                    transactions={transactions}
                    productsFilter={productsFilter}
                    onDelete={handleClickDelete}
                />
            )}
            {tabIndex === 3 && (
                <TableApprove
                    tabIndex={tabIndex}
                    transactions={transactions}
                    productsFilter={productsFilter}
                    onDelete={handleClickDelete}
                />
            )}
        </>
    );
}

export default PostList;
