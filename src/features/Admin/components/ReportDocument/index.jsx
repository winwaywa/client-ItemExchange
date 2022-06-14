import './styles.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import userApi from '../../../../api/userApi';
import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';
import categoryApi from '../../../../api/categoryApi';
import Logo from '../../../../../images/logo.png';

import PropTypes from 'prop-types';
import RenderTransactionLineChart from '../RenderTransactionLineChart';
import RenderTransactionRatioChart from '../RenderTransactionRatioChart';
import RenderTopCategoryChart from '../RenderTopCategoryChart';
import RenderTopUserChart from '../RenderTopUserChart';
import TransactionByTime from '../TransactionByTime';

ReportDocument.propTypes = {};

function ReportDocument({ time }, ref) {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(false);
            const users = await userApi.getAllUsers();
            const products = await productApi.getAllProducts({
                _sort: 'createdAt:DESC',
            });
            const transactions = await transactionApi.getTransactionsWithCondition({
                status: ['approved', 'cancelled', 'completed'],
            });
            const { categories } = await categoryApi.getAllCategory();

            setUsers(users.users);
            setProducts(products.products);
            setTransactions(transactions.transactions);
            setCategoryList(categories);
            setIsLoading(true);
        })();
    }, []);

    const countPostByStatus = (status) => {
        return products.filter((product) => product.status === status).length;
    };

    const countTransactionByStatus = (status) => {
        return transactions.filter((transaction) => transaction.status === status).length;
    };

    function formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return day + '/' + month + '/' + year;
    }

    const dataTopUser = () => {
        const today = Date.now();
        let arr = [];
        let transactionCompleted = [];

        if (time === 'day') {
            transactionCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 24 * 60 * 60 * 1000))
            );
        }
        if (time === '3day') {
            transactionCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 3 * 24 * 60 * 60 * 1000))
            );
        }
        if (time === '7day') {
            transactionCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 7 * 24 * 60 * 60 * 1000))
            );
        }
        if (time === 'all') {
            transactionCompleted = transactions.filter(
                (transaction) => transaction.status === 'completed'
            );
        }

        let counts = {};
        transactionCompleted.forEach((transaction) => {
            counts[transaction.request_recipient] =
                (counts[transaction.request_recipient] || 0) + 1;
            counts[transaction.request_sender] = (counts[transaction.request_sender] || 0) + 1;
        });
        arr = Object.keys(counts).map((x, index) => ({
            name: x,
            quantity: Object.values(counts)[index],
        }));
        //sắp
        arr.sort((a, b) => b.quantity - a.quantity);
        console.log('dataTopUser', arr);
        return arr;
    };

    const dataTopCategory = () => {
        const today = Date.now();
        let arr = [];
        let productCompleted = [];

        if (time === 'day') {
            productCompleted = products.filter(
                (product) =>
                    product.status === 'exchanged' &&
                    moment(product.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 24 * 60 * 60 * 1000))
            );
        }
        if (time === '3day') {
            productCompleted = products.filter(
                (product) =>
                    product.status === 'exchanged' &&
                    moment(product.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 3 * 24 * 60 * 60 * 1000))
            );
        }
        if (time === '7day') {
            productCompleted = products.filter(
                (product) =>
                    product.status === 'exchanged' &&
                    moment(product.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 7 * 24 * 60 * 60 * 1000))
            );
        }
        if (time === 'all') {
            productCompleted = products.filter((product) => product.status === 'exchanged');
        }

        const counts = {};
        productCompleted.forEach(
            (product) => (counts[product.category_id] = (counts[product.category_id] || 0) + 1)
        );
        arr = Object.keys(counts).map((id, index) => ({
            name: id,
            quantity: counts[id],
        }));
        //sắp xếp
        return arr.sort((a, b) => b - a).slice(0, 5);
    };

    //data cho piechart
    const dataTransactionRatio = () => {
        const today = Date.now();
        const day = 24 * 60 * 60 * 1000;
        let countCompleted = 0;
        let countCancelled = 0;

        if (time === 'day') {
            countCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    formatDate(new Date(today)) ===
                        moment(transaction.updatedAt).format('DD/MM/YYYY')
            ).length;
            countCancelled = transactions.filter(
                (transaction) =>
                    transaction.status === 'cancelled' &&
                    formatDate(new Date(today)) ===
                        moment(transaction.updatedAt).format('DD/MM/YYYY')
            ).length;
        }
        if (time === '3day') {
            // chưa fix time
            countCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 3 * 24 * 60 * 60 * 1000))
            ).length;
            countCancelled = transactions.filter(
                (transaction) =>
                    transaction.status === 'cancelled' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 3 * 24 * 60 * 60 * 1000))
            ).length;
        }
        if (time === '7day') {
            // chưa fix time
            countCompleted = transactions.filter(
                (transaction) =>
                    transaction.status === 'completed' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 7 * 24 * 60 * 60 * 1000))
            ).length;
            countCancelled = transactions.filter(
                (transaction) =>
                    transaction.status === 'cancelled' &&
                    moment(transaction.updatedAt).format('DD/MM/YYYY') >
                        formatDate(new Date(today - 7 * 24 * 60 * 60 * 1000))
            ).length;
        }

        if (time === 'all') {
            countCompleted = transactions.filter(
                (transaction) => transaction.status === 'completed'
            ).length;
            countCancelled = transactions.filter(
                (transaction) => transaction.status === 'cancelled'
            ).length;
        }
        return [
            { name: 'Thành công', count: countCompleted },
            { name: 'Đã huỷ', count: countCancelled },
        ];
    };

    // nhóm dữ liệu transaction theo ngày
    const dataTransactionByDay = () => {
        //Date.now() -> 10 ngày trước
        const dayList = [];
        for (let i = 0; i < 7; i++) {
            dayList.push({
                name: formatDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
                completed: 0,
                cancelled: 0,
            });
        }
        console.log(dayList); //['11/06/2022', '10/06/2022', '09/06/2022', '08/06/2022', '07/06/2022', '06/06/2022', '05/06/2022', '04/06/2022', '03/06/2022', '02/06/2022']

        const transactionList = transactions.filter(
            (transaction) =>
                transaction.status === 'completed' || transaction.status === 'cancelled'
        );
        const data = transactionList.map((transaction) => ({
            day: moment(transaction.updatedAt).format('DD/MM/YYYY'),
            status: transaction.status,
        }));
        console.log(data); // [{day: '12/06/2022', status: 'completed'}, {…}, {…}, {…}, {…}, {…}]

        dayList.forEach((day, index) => {
            const items = data.filter((x) => x.day === day.name);
            console.log('items', items);
            if (items.length > 0) {
                items.forEach((i) =>
                    i.status === 'completed'
                        ? (dayList[index].completed += 1)
                        : (dayList[index].cancelled += 1)
                );
            }
        });
        console.log(dayList);
        // {name: '12/06/2022', completed: 1, cancelled: 0}
        //  {name: '11/06/2022', completed: 3, cancelled: 0}
        //  {name: '10/06/2022', completed: 0, cancelled: 0}

        return dayList.reverse();
    };

    const today = Date.now();

    return (
        <div className="report" ref={ref}>
            {isLoading && (
                <>
                    <div className="report__header">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <h1>Báo cáo web</h1>
                            <img src={Logo} className="header__logo" />
                            <h3 style={{ color: '#999' }}>chodoido.vn</h3>
                        </div>
                        {time === 'day' && (
                            <div style={{ textAlign: 'right' }}>
                                Đà Nẵng, ngày {formatDate(new Date(today))}
                            </div>
                        )}
                        {time === '3day' && (
                            <div style={{ textAlign: 'right' }}>
                                Đà Nẵng, từ ngày{' '}
                                {formatDate(new Date(today - 2 * 24 * 60 * 60 * 1000))} đến{' '}
                                {formatDate(new Date(today))}
                            </div>
                        )}
                        {time === '7day' && (
                            <div style={{ textAlign: 'right' }}>
                                Đà Nẵng, từ ngày{' '}
                                {formatDate(new Date(today - 6 * 24 * 60 * 60 * 1000))} đến{' '}
                                {formatDate(new Date(today))}
                            </div>
                        )}
                    </div>

                    {time === '7day' && (
                        <div>
                            <h2>Biểu đồ giao dịch</h2>
                            <div className="report__container">
                                <RenderTransactionLineChart data={dataTransactionByDay()} />
                            </div>
                        </div>
                    )}

                    {/* tỉ lệ giao dịch */}
                    <h2>Tỉ lệ giao dịch</h2>
                    <div className="transaction-ratio report__container">
                        <div style={{ flex: 0.65 }}>
                            <RenderTransactionRatioChart data={dataTransactionRatio()} />
                        </div>
                        <div style={{ flex: 0.35 }}>
                            <ul className="transaction-ratio__list">
                                <li className="transaction-ratio__item">
                                    <i
                                        style={{
                                            display: 'inline-block',
                                            width: '2rem',
                                            height: '2rem',
                                            marginRight: '0.5rem',
                                            borderRadius: '0.3rem',
                                            backgroundColor: '#04AA6D',
                                        }}
                                    />
                                    <span>Thành công ({dataTransactionRatio()[0].count})</span>
                                </li>
                                <li className="transaction-ratio__item">
                                    <i
                                        style={{
                                            display: 'inline-block',
                                            width: '2rem',
                                            height: '2rem',
                                            marginRight: '0.5rem',
                                            borderRadius: '0.3rem',
                                            backgroundColor: '#F44336',
                                        }}
                                    />
                                    <span>Đã huỷ ({dataTransactionRatio()[1].count})</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <TransactionByTime
                        transactionList={transactions}
                        userList={users}
                        productList={products}
                        time={time}
                    />

                    {/* danh sách giao dịch */}

                    {/* top users */}
                    <h2>Xếp hạng người dùng</h2>
                    <div className="user report__container">
                        <div style={{ flex: 0.35 }}>
                            <ul className="user__list">
                                {dataTopUser().map((user, index) => (
                                    <li key={user.name} className="user__item">
                                        <strong style={{ width: '2rem' }}>{index + 1}.</strong>
                                        <img
                                            src={
                                                users.filter((u) => u.username === user.name)[0]
                                                    .avatar
                                            }
                                            alt={user.name}
                                        />
                                        <Link to={`/${user.name}`}>{user.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: 0.65 }}>
                            <RenderTopUserChart data={dataTopUser()} />
                        </div>
                    </div>

                    {/* top categories */}
                    <h2>Xếp hạng loại đồ</h2>
                    <div className="top-category report__container">
                        <div style={{ flex: 0.65 }}>
                            <RenderTopCategoryChart data={dataTopCategory()} />
                        </div>
                        <div style={{ flex: 0.35 }}>
                            <ul className="top-category__list">
                                {dataTopCategory().map((category, index) => (
                                    <li key={index} className="top-category__item">
                                        <i
                                            style={{
                                                display: 'inline-block',
                                                width: '2rem',
                                                height: '2rem',
                                                marginRight: '0.5rem',
                                                borderRadius: '0.3rem',
                                                backgroundColor: [
                                                    '#E94C7B',
                                                    '#FACF4C',
                                                    '#3FCD7F',
                                                    '#1976D2',
                                                    '#559999',
                                                ][index],
                                            }}
                                        />
                                        <span>
                                            {
                                                categoryList.filter(
                                                    (c) => c._id === category.name
                                                )[0].category_name
                                            }
                                            &nbsp;({category.quantity})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default React.forwardRef(ReportDocument);
