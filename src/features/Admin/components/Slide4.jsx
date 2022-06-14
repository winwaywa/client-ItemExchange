import React from 'react';
import PropTypes from 'prop-types';
//mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import RenderTopCategoryChart from '../components/RenderTopCategoryChart';

Slide4.propTypes = {};

function Slide4({ categoryList, dataTopCategory }) {
    const [time, setTime] = React.useState('day');

    const handleChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <div className="top-category dashboard__container">
            <div style={{ flex: 0.65 }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h3 style={{ marginRight: '1rem' }}>Tỉ lệ giao dịch</h3>
                    <select value={time} onChange={handleChange}>
                        <option value={'day'}>Hôm nay</option>
                        <option value={'3day'}>3 ngày gần đây</option>
                        <option value={'7day'}>7 ngày gần đây</option>
                        <option value={'all'}>Tất cả</option>
                    </select>
                </div>

                <RenderTopCategoryChart data={dataTopCategory(time)} />
            </div>
            <div style={{ flex: 0.35 }}>
                <ul className="top-category__list">
                    {dataTopCategory(time).map((category, index) => (
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
                                    categoryList.filter((c) => c._id === category.name)[0]
                                        .category_name
                                }
                                &nbsp;({category.quantity})
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Slide4;
