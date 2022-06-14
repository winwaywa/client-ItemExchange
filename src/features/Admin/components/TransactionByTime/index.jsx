import React from 'react';
import moment from 'moment';
import { formatTime, formatPrice } from '../../../../utils';
import PropTypes from 'prop-types';
import { style } from '@mui/system';
TransactionByTime.propTypes = {};

function TransactionByTime({ userList, productList, transactionList, time }) {
    function formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return day + '/' + month + '/' + year;
    }

    const today = Date.now();
    const getListTransactionByTime = () => {
        const transactionByTime = [];

        if (time === 'day') {
            const day = formatDate(new Date(today));
            const transactions = transactionList.filter(
                (transaction) => moment(transaction.updatedAt).format('DD/MM/YYYY') === day
            );
            const transactionsCompleted = transactions.filter(
                (transaction) => transaction.status === 'completed'
            );
            const transactionsCancelled = transactions.filter(
                (transaction) => transaction.status === 'cancelled'
            );
            transactionByTime.push({
                day,
                completed: transactionsCompleted,
                cancelled: transactionsCancelled,
            });
        }
        if (time === '3day') {
            const dayList = [];
            for (let i = 0; i < 3; i++) {
                dayList.push(formatDate(new Date(today - i * 24 * 60 * 60 * 1000)));
            }
            dayList.forEach((day) => {
                const transactions = transactionList.filter(
                    (transaction) => moment(transaction.updatedAt).format('DD/MM/YYYY') === day
                );
                const transactionsCompleted = transactions.filter(
                    (transaction) => transaction.status === 'completed'
                );
                const transactionsCancelled = transactions.filter(
                    (transaction) => transaction.status === 'cancelled'
                );
                transactionByTime.push({
                    day,
                    completed: transactionsCompleted,
                    cancelled: transactionsCancelled,
                });
            });
        }
        if (time === '7day') {
            const dayList = [];
            for (let i = 0; i < 6; i++) {
                dayList.push(formatDate(new Date(today - i * 24 * 60 * 60 * 1000)));
            }
            dayList.forEach((day) => {
                const transactions = transactionList.filter(
                    (transaction) => moment(transaction.updatedAt).format('DD/MM/YYYY') === day
                );
                const transactionsCompleted = transactions.filter(
                    (transaction) => transaction.status === 'completed'
                );
                const transactionsCancelled = transactions.filter(
                    (transaction) => transaction.status === 'cancelled'
                );
                transactionByTime.push({
                    day,
                    completed: transactionsCompleted,
                    cancelled: transactionsCancelled,
                });
            });
        }
        return transactionByTime;
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'red',
            }}
        >
            <div>
                {getListTransactionByTime().map((day) => (
                    <div style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
                        <span
                            style={{
                                paddingLeft: '1rem',
                                borderLeft: '3px solid var(--color-primary)',
                            }}
                        >
                            {day.day}
                        </span>
                        <div style={{ marginLeft: '2rem' }}>
                            <h4 style={{ color: '#04AA6D' }}>
                                Thành công ({day.completed.length})
                            </h4>
                            {day.completed.map((transaction) => (
                                <p>
                                    <span style={{ fontStyle: 'italic', fontWeight: 300 }}>
                                        {moment(transaction.updatedAt).format('HH:mm')}:
                                    </span>
                                    &nbsp;&nbsp;
                                    <span>
                                        {transaction.request_recipient}({' '}
                                        {
                                            productList.filter(
                                                (product) =>
                                                    transaction.product_id_requested === product._id
                                            )[0].product_name
                                        }{' '}
                                        {/* <img
                                            style={{ width: '15rem' }}
                                            src={
                                                productList
                                                    .filter(
                                                        (product) =>
                                                            transaction.product_id_requested ===
                                                            product._id
                                                    )[0]
                                                    .images_url.split(',')[0]
                                            }
                                        />{' '} */}
                                        ) đã giao dịch thành công với {transaction.request_sender}({' '}
                                        {transaction.exchange_value.length > 12
                                            ? productList.filter(
                                                  (product) =>
                                                      transaction.exchange_value === product._id
                                              )[0].product_name
                                            : formatPrice(transaction.exchange_value)}{' '}
                                        ).
                                    </span>
                                </p>
                            ))}
                        </div>
                        <div style={{ marginLeft: '2rem' }}>
                            <h4 style={{ color: '#f44336' }}>Đã huỷ ({day.cancelled.length})</h4>
                            {day.cancelled.map((transaction) => (
                                <p>
                                    <span>{moment(transaction.updatedAt).format('HH:mm')}:</span>
                                    &nbsp;&nbsp;
                                    <span>
                                        {transaction.request_recipient}({' '}
                                        {
                                            productList.filter(
                                                (product) =>
                                                    transaction.product_id_requested === product._id
                                            )[0].product_name
                                        }{' '}
                                        ) đã huỷ giao dịch với {transaction.request_sender}({' '}
                                        {transaction.exchange_value.length > 12
                                            ? productList.filter(
                                                  (product) =>
                                                      transaction.exchange_value === product._id
                                              )[0].product_name
                                            : formatPrice(transaction.exchange_value)}{' '}
                                        ).
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransactionByTime;
