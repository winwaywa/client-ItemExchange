import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AcceptIcon from '../../../../images/icon-svg/accept-icon.svg';
import CancelIcon from '../../../../images/icon-svg/cancel-icon.svg';
import { formatTime } from '../../../utils';
import RenderTransactionRatioChart from '../components/RenderTransactionRatioChart';

Slide2.propTypes = {};

function Slide2({ transactions, dataTransactionRatio }) {
    const [time, setTime] = React.useState('day');

    const handleChange = (e) => {
        setTime(e.target.value);
    };

    console.log(time);
    return (
        <div className="transaction dashboard__container">
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h3 style={{ marginRight: '1rem' }}>Tỉ lệ giao dịch</h3>
                    <select value={time} onChange={handleChange}>
                        <option value={'day'}>Hôm nay</option>
                        <option value={'3day'}>3 ngày gần đây</option>
                        <option value={'7day'}>7 ngày gần đây</option>
                        <option value={'all'}>Tất cả</option>
                    </select>
                </div>
                <RenderTransactionRatioChart data={dataTransactionRatio(time)} />
                <ul>
                    <li style={{ display: 'inline-block', marginRight: '2rem' }}>
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
                        <span>Thành công ({dataTransactionRatio(time)[0].count})</span>
                    </li>
                    <li style={{ display: 'inline-block' }}>
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
                        <span>Đã huỷ ({dataTransactionRatio(time)[1].count})</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3>Những giao dịch gần đây</h3>
                <ul className="transaction__list">
                    {transactions.slice(0, 6).map((transaction) => {
                        if (transaction.status === 'completed')
                            return (
                                <li className="transaction__item" key={transaction._id}>
                                    <img
                                        style={{
                                            marginRight: '1rem',
                                            backgroundColor: 'violet',
                                            borderRadius: '100%',
                                            padding: '0.3rem',
                                            filter: 'invert(1)',
                                        }}
                                        className="svg-icon"
                                        src={AcceptIcon}
                                    />
                                    <p>
                                        {transaction.request_recipient} đã giao dịch thành công với{' '}
                                        {transaction.request_sender} vào lúc{' '}
                                        {formatTime(transaction.updatedAt)}
                                    </p>
                                </li>
                            );
                        else {
                            return (
                                transaction.status === 'cancelled' && (
                                    <li className="transaction__item" key={transaction._id}>
                                        <img
                                            style={{
                                                marginRight: '1rem',
                                                backgroundColor: 'aqua',
                                                borderRadius: '100%',
                                                padding: '0.3rem',
                                                filter: 'invert(1)',
                                            }}
                                            className="svg-icon"
                                            src={CancelIcon}
                                        />
                                        <p>
                                            {transaction.request_recipient} đã huỷ giao dịch với{' '}
                                            {transaction.request_sender} vào lúc{' '}
                                            {formatTime(transaction.updatedAt)}
                                        </p>
                                    </li>
                                )
                            );
                        }
                    })}
                </ul>
                <Link to="transactions">Xem tất cả...</Link>
            </div>
        </div>
    );
}

export default Slide2;
