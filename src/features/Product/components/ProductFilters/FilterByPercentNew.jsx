import React from 'react';
import PropTypes from 'prop-types';
//mui
import Slider from '@mui/material/Slider';

FilterByPercentNew.propTypes = {};

function valuetext(value) {
    return `${value}%`;
}
const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
];

function FilterByPercentNew({ onChange }) {
    const [value, setValue] = React.useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange({ percent_new_gte: value[0], percent_new_lte: value[1] });
    };

    return (
        <div>
            <h3 className="heading-tertiary">Độ mới</h3>
            <Slider
                getAriaLabel={() => 'Percent new'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={marks}
                size="small"
            />
        </div>
    );
}

export default FilterByPercentNew;
