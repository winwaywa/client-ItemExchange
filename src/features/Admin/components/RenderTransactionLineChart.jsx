import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import PropTypes from 'prop-types';
RenderTransactionLineChart.propTypes = {};

function RenderTransactionLineChart({ data = [] }) {
    console.log(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="completed" stroke="#04AA6D" />
                <Line type="monotone" dataKey="cancelled" stroke="#F44336" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default RenderTransactionLineChart;
