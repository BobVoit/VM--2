import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     x: 0,
//     phi: 25,
//     y: 25,
//   },
//   {
//     x: 5,
//     phi: 25,
//     y: 2,
//   },
//   {
//     x: 13,
//     phi: 214,
//     y: 14,
//   },
//   {
//     x: 77,
//     phi: 35,
//     y: 95,
//   },
// ];


const Chart = ({ data }) => {

    console.log(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="phi" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}


export default Chart;