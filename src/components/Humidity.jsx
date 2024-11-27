/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

// Define humidity levels: low, medium, high
const data = [
    { name: 'Low Humidity', value: 30, color: '#ff0000' },   // 0% - 30%
    { name: 'Medium Humidity', value: 40, color: '#00ff00' }, // 30% - 60%
    { name: 'High Humidity', value: 30, color: '#0000ff' },    // 60%+
];

const cx = 100; // Center X adjusted for new size
const cy = 100; // Center Y adjusted for new size
const iR = 30;  // Inner radius adjusted for new size
const oR = 80;  // Outer radius adjusted for new size

const RADIAN = Math.PI / 180;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path key="needle-path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
    ];
};

export default class HumidityChart extends PureComponent {
    render() {
        const { value } = this.props; // Get value from props

        return (
            <>
                <PieChart width={200} height={200}> {/* Set size to 200px x 200px */}
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    {needle(value, data, cx, cy, iR, oR, '#d0d000')}
                </PieChart>
                <p className='relative bottom-20 left-24'>{value} %</p>
            </>
        );
    }
}
