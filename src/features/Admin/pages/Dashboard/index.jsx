import './styles.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LookIcon from '../../../../../images/icon-svg/look-icon.svg';
import PostIcon from '../../../../../images/icon-svg/post-icon.svg';
import UserIcon from '../../../../../images/icon-svg/user-icon.svg';
import ReportIcon from '../../../../../images/icon-svg/report-icon.svg';

import PropTypes from 'prop-types';
import userApi from '../../../../api/userApi';
import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';
import RenderLineChart from '../../components/RenderLineChart';

Dashboard.propTypes = {};

function Dashboard(props) {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    console.log(products);
    useEffect(() => {
        (async () => {
            const users = await userApi.getAllUsers();
            const products = await productApi.getAllProducts({
                _sort: 'createdAt:DESC',
            });
            const transactions = await transactionApi.getTransactionsWithCondition({
                status: 'completed',
            });
            setUsers(users.users);
            setProducts(products.products);
            setTransactions(transactions.transactions);
        })();
    }, []);

    const countPostByStatus = (status) => {
        return products.filter((product) => product.status === status).length;
    };

    // nhóm dữ liệu transaction theo ngày
    const dataStatis = () => {
        //đổi định dạng ISO -> mong muốn
        const data = transactions.map((transaction) =>
            moment(`${transaction.updatedAt}`).format('DD-MM-YYYY')
        );

        //đếm số ngày trùng nhau
        var counts = {};
        data.forEach((x) => (counts[x] = (counts[x] || 0) + 1));

        const arr = Object.keys(counts).map((x, index) => ({
            name: x,
            quantity: Object.values(counts)[index],
        }));

        console.log(arr); // {name: '21-05-2022', count: 1}
        return arr.reverse();
    };

    return (
        <div className="dashboard">
            <div className="navigation">
                <div
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="navigation__box"
                >
                    <img className="navigation__icon" src={LookIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">1205</span> lượt truy cập
                    </div>
                </div>
                <Link style={{ backgroundColor: '#04AA6D ' }} to="user" className="navigation__box">
                    <img className="navigation__icon" src={UserIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">{users.length}</span>
                        Người dùng mới
                    </div>
                </Link>

                <Link
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                    to="post"
                    className="navigation__box"
                >
                    <img className="navigation__icon" src={PostIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">{countPostByStatus('disable')}</span>{' '}
                        Bài viết chưa duyệt
                    </div>
                </Link>
                <div style={{ backgroundColor: '#f44336' }} className="navigation__box">
                    <img className="navigation__icon" src={ReportIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">10</span>
                        Báo cáo vi phạm mới
                    </div>
                </div>
            </div>
            <div className="transaction">
                <div>
                    <h4 className="transaction__title">Số giao dịch thành công theo ngày</h4>
                    <RenderLineChart data={dataStatis()} />
                </div>
                <div>
                    <h4 className="transaction__title">Những giao dịch gần đây</h4>
                    <ul className="transaction__list">
                        {transactions.slice(0, 4).map((transaction) => (
                            <li key={transaction._id}>
                                {transaction.request_recipient} đã giao dịch thành công với{' '}
                                {transaction.request_sender} vào lúc{' '}
                                {moment(`${transaction.updatedAt}`).format('h:mm a DD-MM-YYYY')}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
