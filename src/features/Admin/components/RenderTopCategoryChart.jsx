import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import PropTypes from 'prop-types';

RenderTopCategoryChart.propTypes = {};

function RenderTopCategoryChart({ data }) {
    const COLORS = ['#E94C7B', '#FACF4C', '#3FCD7F', '#1976D2', '#559999'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        payload,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="80%">
            <PieChart>
                <Pie
                    dataKey="quantity"
                    // startAngle={0}
                    // endAngle={360}
                    data={data}
                    // cx="50%"
                    // cy="50%"
                    outerRadius={'90%'}
                    innerRadius={'60%'}
                    strokeWidth={2}
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default RenderTopCategoryChart;
