import './styles.scss';
import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);

import moment from 'moment';

import PropTypes from 'prop-types';
import userApi from '../../../../api/userApi';
import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';
import categoryApi from '../../../../api/categoryApi';

import Slide1 from '../../components/Slide1';
import Slide2 from '../../components/Slide2';
import Slide3 from '../../components/Slide3';
import Slide4 from '../../components/Slide4';
import FullScreenDialog from '../../components/FullScreenDialog';
Dashboard.propTypes = {};

function Dashboard(props) {
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

    const dataTopUser = (time) => {
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

    const dataTopCategory = (time) => {
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
    const dataTransactionRatio = (time) => {
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

    //dialog report
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="dashboard">
            <button
                className="btn btn--small btn--primary dashboard__btn-report"
                onClick={handleClickOpen}
            >
                Báo cáo
            </button>
            {open && <FullScreenDialog handleClose={handleClose} />}

            {isLoading && (
                <>
                    <Swiper
                        direction={'vertical'}
                        slidesPerView={1}
                        spaceBetween={30}
                        mousewheel={true}
                        pagination={{
                            clickable: true,
                        }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Slide1
                                users={users}
                                countPostByStatus={countPostByStatus}
                                countTransactionByStatus={countTransactionByStatus}
                                dataTransactionByDay={dataTransactionByDay}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide2
                                transactions={transactions}
                                dataTransactionRatio={dataTransactionRatio}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide3 users={users} dataTopUser={dataTopUser} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide4 categoryList={categoryList} dataTopCategory={dataTopCategory} />
                        </SwiperSlide>
                        <SwiperSlide>Theo Khu vực</SwiperSlide>
                    </Swiper>
                </>
            )}
        </div>
    );
}

export default Dashboard;
