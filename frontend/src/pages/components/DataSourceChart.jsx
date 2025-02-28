import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'

const DataSourceChart = ({ dataSource, dynamicDates }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!dataSource?.length) return
    const chart = echarts.init(chartRef.current)
    const xData = dataSource.map(item => item.number)

    const series = [
      ...dynamicDates.map(date => ({
        name: date,
        type: 'line',
        data: dataSource.map(item => Number(item[date]))
      }))
    ]
    
    chart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: series.map(s => s.name) },
      xAxis: { type: 'category', data: xData },
      yAxis: { type: 'value' },
      series
    })

    return () => chart.dispose()
  }, [dataSource, dynamicDates])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default DataSourceChart
