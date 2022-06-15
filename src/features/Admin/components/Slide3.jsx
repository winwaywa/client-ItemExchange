import React from 'react';
import PropTypes from 'prop-types';
//mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Link } from 'react-router-dom';
import RenderTopUserChart from '../components/RenderTopUserChart';

Slide3.propTypes = {};

function Slide3({ users, dataTopUser }) {
    const [time, setTime] = React.useState('day');

    const handleChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <div className="user dashboard__container">
            <div style={{ flex: 0.35 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ marginRight: '1rem' }}>Top người dùng</h3>
                    <select value={time} onChange={handleChange}>
                        <option value={'day'}>Hôm nay</option>
                        <option value={'3day'}>3 ngày gần đây</option>
                        <option value={'7day'}>7 ngày gần đây</option>
                        <option value={'all'}>Tất cả</option>
                    </select>
                </div>
                <ul className="user__list">
                    {dataTopUser(time).map((user, index) => (
                        <li key={user.name} className="user__item">
                            <strong style={{ width: '2rem' }}>{index + 1}.</strong>
                            <img
                                src={users.filter((u) => u.username === user.name)[0].avatar}
                                alt={user.name}
                            />
                            <Link to={`/${user.name}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 0.65 }}>
                <RenderTopUserChart data={dataTopUser(time)} />
            </div>
        </div>
    );
}

export default Slide3;
