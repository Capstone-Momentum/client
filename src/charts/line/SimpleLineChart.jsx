import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class SimpleLineChart extends PureComponent {
    render() {
        const { scaler, data, xAxisKey, lines, includeLegend, grid } = this.props
        return (
            <LineChart
                width={500 * scaler}
                height={300 * scaler}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                {grid ? grid : <CartesianGrid strokeDasharray="3 3" />}
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                {includeLegend && <Legend />}
                {lines}
            </LineChart>
        );
    }
}

// Example Usage:
export const mockData = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

export function SimpleLineChartExample() {
    const lines = [
        <Line key='mock-line-1' type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />,
        <Line key='mock-line-2' dataKey="uv" stroke="#82ca9d" />
    ]
    return (
        <SimpleLineChart
            scaler={1.5}
            data={mockData}
            xAxisKey={'name'}
            lines={lines}
            includeLegend
        />
    )
}