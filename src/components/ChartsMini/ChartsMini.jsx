import React from 'react';
import { BarChart, Bar, Label, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export function ChartsMini({ chart }) {
  console.log(chart);
  return (
    <ResponsiveContainer width="50%" height={100}>
      <BarChart
        width='50%'
        height={100}
        data={chart.data}
        layout='vertical'
        barCategoryGap={25}
      >
        <XAxis type='number'
          style={{ fontFamily: 'Montserrat', fontSize: 12 }}
          label={{value: chart.name, position: "insideBottom", offset: 0, fontFamily: 'Montserrat', fontSize: 12, fontWeight: 700}}
        />
        <YAxis dataKey="name" type='category'
          style={{ fontFamily: 'Montserrat', fontSize: 12 }}
        />
        <Bar name='План' dataKey="plan" fill="#8884d8" />
        <Bar name='Факт' dataKey="fact" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}