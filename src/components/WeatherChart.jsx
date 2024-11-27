import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherChart = ({ data, weatherInfo }) => {
    // Custom Label Component for chart
    const CustomizedLabel = ({ x, y, stroke, value }) => (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );

    // Custom Axis Tick Component for X Axis
    const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
    );
    

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" height={10} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Max temperature Line */}
                    <Line
                        type="monotone"
                        dataKey="maxTemp"
                        stroke="#8884d8"
                        label={<CustomizedLabel />}
                    />
                    {/* Min temperature Line */}
                    <Line
                        type="monotone"
                        dataKey="minTemp"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherChart;
