import React, { useEffect, useState, useMemo } from 'react';

import TableNoApprove from '../PostTable/TableNoApprove';
import TableApprove from '../PostTable/TableApprove';
import PropTypes from 'prop-types';
PostList.propTypes = {};

function PostList({
    products,
    transactions,
    tabIndex,
    handleDeleteProduct,
    handleTransactionDone,
    handleTransactionCancel,
}) {
    const [state, setState] = useState('');

    const [productsFilter, setproductsFilter] = useState();
    const [transactionFilter, setTransactionFilter] = useState();

    useMemo(() => {
        setproductsFilter(products.filter((product) => product.status === state));
        setTransactionFilter(transactions.filter((transaction) => transaction.status === state));
    }, [state, products, transactions]);

    useEffect(() => {
        switch (tabIndex) {
            case 0:
                setState('disable');
                break;
            case 1:
                setState('enable');
                break;
            case 2:
                setState('approved');
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

    const handleClickDone = (transaction_id, product_id_requested, exchange_value) => {
        handleTransactionDone(transaction_id, product_id_requested, exchange_value);
    };

    const handleClickCancel = (transaction_id, product_id_requested, exchange_value) => {
        handleTransactionCancel(transaction_id, product_id_requested, exchange_value);
    };

    return (
        <>
            {tabIndex === 0 && (
                <TableNoApprove
                    tabIndex={tabIndex}
                    productsFilter={productsFilter}
                    onDelete={handleClickDelete}
                />
            )}
            {tabIndex === 1 && (
                <TableNoApprove
                    tabIndex={tabIndex}
                    productsFilter={productsFilter}
                    onDelete={handleClickDelete}
                />
            )}
            {tabIndex === 2 && (
                <TableApprove
                    tabIndex={tabIndex}
                    transactions={transactionFilter}
                    onCancel={handleClickCancel}
                    onDone={handleClickDone}
                />
            )}
            {tabIndex === 3 && (
                <TableApprove tabIndex={tabIndex} transactions={transactionFilter} />
            )}
        </>
    );
}

export default PostList;
