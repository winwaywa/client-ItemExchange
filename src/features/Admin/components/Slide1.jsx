import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LookIcon from '../../../../images/icon-svg/look-icon.svg';
import PostIcon from '../../../../images/icon-svg/post-icon.svg';
import UserIcon from '../../../../images/icon-svg/user-icon.svg';
import ReportIcon from '../../../../images/icon-svg/report-icon.svg';

import RenderTransactionLineChart from '../components/RenderTransactionLineChart';

Slide1.propTypes = {};

function Slide1({ users, countPostByStatus, countTransactionByStatus, dataTransactionByDay }) {
    const [time, setTime] = React.useState('day');
    const handleChange = (e) => {
        setTime(e.target.value);
    };
    return (
        <div style={{ width: '100%' }}>
            <div className="navigation">
                <div
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="navigation__box"
                >
                    <img className="navigation__icon" src={LookIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">1205</span>{' '}
                        <span className="text">Lượt truy cập</span>
                    </div>
                </div>
                <Link style={{ backgroundColor: '#599' }} to="user" className="navigation__box">
                    <img className="navigation__icon" src={UserIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">{users.length}</span>
                        <span className="text">Người dùng</span>
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
                        <span className="text">Bài viết chưa duyệt</span>
                    </div>
                </Link>
                <Link
                    to="transactions"
                    style={{ backgroundColor: '#ea4c89' }}
                    className="navigation__box"
                >
                    <img className="navigation__icon" src={ReportIcon} alt="look-icon" />
                    <div>
                        <span className="navigation__quantity">
                            {countTransactionByStatus('approved')}
                        </span>{' '}
                        <span className="text"> Đang giao dịch</span>
                    </div>
                </Link>
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ marginRight: '1rem' }}>Biểu đồ giao dịch</h3>
                    <select value={time} onChange={handleChange}>
                        <option value={'day'}>7 ngày gần đây</option>
                        <option value={'month'}>Tháng</option>
                        <option value={'year'}>Năm</option>
                    </select>
                </div>
                <div style={{ width: '100%', height: '40rem' }}>
                    <RenderTransactionLineChart data={dataTransactionByDay()} />
                </div>
            </div>
        </div>
    );
}

export default Slide1;
