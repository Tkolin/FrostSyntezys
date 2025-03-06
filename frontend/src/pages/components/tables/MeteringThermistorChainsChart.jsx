import { useQuery } from '@apollo/client'
import { Space } from 'antd'
import ReactECharts from 'echarts-for-react' // Импорт компонента для ECharts
import React, { useMemo } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import {
  cutMeteringData,
  transformMeteringData
} from '../../../utils/dataUtils' // Импорт утилиты

const MeteringThermistorChainsChart = ({
  installedThermistorChainsId,
  dateStart,
  dateEnd,
  forecastDays,
  forecastMethod,
  ...props
}) => {
  const { data, loading, error } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: installedThermistorChainsId }
  })

  // Использование утилиты для трансформации данных
  const dataSource = useMemo(() => {
    if (!data) return []
    const result = cutMeteringData(
      transformMeteringData(
        data?.InstalledThermistorChain?.metering_thermistor_chains,
        forecastMethod,
        forecastDays
      ),
      dateStart,
      dateEnd
    )
    console.log('result', result)
    return result
  }, [data, forecastMethod, forecastDays, dateStart, dateEnd])

  // Формирование опций для графика
  const chartOptions = useMemo(() => {
    console.log('dataSource', dataSource)
    console.log('data', data)

    if (dataSource.length === 0) return {}

    // Маппинг ключей (dp_<id>) в глубину
    const depthMapping = {}
    if (
      data &&
      data.InstalledThermistorChain &&
      data.InstalledThermistorChain.installed_thermistor_chain_points
    ) {
      data.InstalledThermistorChain.installed_thermistor_chain_points.forEach(
        point => {
          depthMapping[`dp_${point.id}`] = point.deep
        }
      )
    }

    // Определяем ключи серий (исключая id и date_metering)
    const seriesKeys = Object.keys(dataSource[0]).filter(
      key => key !== 'id' && key !== 'date_metering'
    )

    // Основные серии данных
    const dataSeries = seriesKeys.map(key => ({
      name: depthMapping[key] || key,
      type: 'line',
      data: dataSource.map(row => row[key])
    }))

    // Отдельная серия для линии "Опасно (выше 0)"
    const dangerousLineSeries = {
      name: 'Опасно (выше 0)',
      type: 'line',
      data: dataSource.map(() => 0),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'orange',
          type: 'dashed'
        },
        data: [{ yAxis: 0 }]
      },
      symbol: 'none'
    }

    // Отдельная серия для линии "Критическое (выше 2)"
    const criticalLineSeries = {
      name: 'Критическое (выше 2)',
      type: 'line',
      data: dataSource.map(() => 2),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'red',
          type: 'dashed'
        },
        data: [{ yAxis: 2 }]
      },
      symbol: 'none'
    }

    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: dataSource.map(row => row.date_metering)
      },
      yAxis: {
        type: 'value'
      },
      toolbox: {
        right: 10,
        feature: {
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 2,
            color: '#FD0100'
          },
          {
            gt: 0,
            lte: 2,
            color: '#FBDB0F'
          }
        ],
        outOfRange: {
          color: '#999'
        }
      },
      legend: {
        data: [
          ...seriesKeys.map(key => depthMapping[key] || key),
          dangerousLineSeries.name,
          criticalLineSeries.name
        ]
      },
      series: [...dataSeries, dangerousLineSeries, criticalLineSeries]
    }
  }, [dataSource, data])
  console.log('Chart dataSource:', dataSource)

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <ReactECharts
        option={chartOptions}
        style={{ height: '400px', width: '100%' }}
      />
    </Space>
  )
}

export default MeteringThermistorChainsChart
