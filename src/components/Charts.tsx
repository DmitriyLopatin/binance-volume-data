"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { IChartData } from '@/constants/interfaces';
import { useWindowResize } from '@/constants/helpers';


type Props = {
  chartData: IChartData[]
}
const Charts: React.FunctionComponent<Props> = ({ chartData }) => {
  const windowResize = useWindowResize()
  return (
    <div className='chart-container'>
      <BarChart
        width={windowResize ? (windowResize - 80) : 200}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={10}
      >
        <XAxis dataKey="time" scale="point" padding={{ left: 5, right: 5 }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="vol" fill="#1fcd25" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  )
}

export default Charts