import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from '../TransactionItem';

TransactionList.propTypes = {};

function TransactionList({ tabIndex, user, transactions, productList, onDone, onCancel }) {
    return (
        <>
            {transactions.length > 0 && (
                <table className="transaction__table">
                    <tr>
                        <th>Nhận yêu cầu</th>
                        <th>Gửi yêu cầu</th>
                        <th>Thời gian</th>
                        {tabIndex === 'approved' && <th>Thao tác</th>}
                    </tr>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <TransactionItem
                                    tabIndex={tabIndex}
                                    user={user}
                                    productList={productList}
                                    transaction={transaction}
                                    onDone={onDone}
                                    onCancel={onCancel}
                                />
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default TransactionList;
