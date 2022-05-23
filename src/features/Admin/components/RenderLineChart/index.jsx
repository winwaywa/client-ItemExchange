import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

RenderLineChart.propTypes = {};

function RenderLineChart({ data = [] }) {
    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    );
}

export default RenderLineChart;
