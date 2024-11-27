import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Updated WeatherChart to accept `minArr` and `maxArr` as props
class WeatherChart extends PureComponent {
  render() {
    const { minArr, maxArr } = this.props;

    // Prepare the data array using the minArr and maxArr
    const weatherData = minArr.map((minTemp, index) => ({
      name: `Nov ${index + 26}`, // Generating date based on the index
      minTemp,
      maxTemp: maxArr[index],
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weatherData}
          margin={{
            top: 40,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={50} />
          <YAxis domain={[0, 30]} />
          <Tooltip />
          <Legend />
          
          {/* Max temperature Line */}
          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="#8884d8"
          />
          
          {/* Min temperature Line */}
          <Line
            type="monotone"
            dataKey="minTemp"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default WeatherChart;
