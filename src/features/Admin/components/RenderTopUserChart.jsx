import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import PropTypes from 'prop-types';

RenderTopUserChart.propTypes = {};

function RenderTopUserChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                maxBarSize={50}
                layout="vertical"
                margin={{
                    top: 20,
                    right: 10,
                    left: 180,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type={'number'} orientation={'bottom'} />
                <YAxis type={'category'} orientation={'left'} dataKey={'name'} />
                <Bar dataKey={'quantity'} fill={'#8884d8'} />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default RenderTopUserChart;
