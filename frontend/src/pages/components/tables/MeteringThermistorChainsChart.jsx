import { useQuery } from '@apollo/client'
import { Space } from 'antd'
import ReactECharts from 'echarts-for-react' // Импорт компонента для ECharts
import React, { useEffect, useMemo } from 'react'
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
  const { data, loading, error , refetch
} = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: installedThermistorChainsId }
  })
  useEffect(() => {
    refetch()
  }, [])
  // Преобразование данных замеров
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

    // Получаем пороговые значения из данных
    const installedChain = data?.InstalledThermistorChain
    const maxWarning = installedChain
      ? parseFloat(installedChain.max_warning_temperature)
      : 0
    const maxCritical = installedChain
      ? parseFloat(installedChain.max_critical_temperature)
      : 2
    const minWarning = installedChain
      ? parseFloat(installedChain.min_warning_temperature)
      : 0
    const minCritical = installedChain
      ? parseFloat(installedChain.min_critical_temperature)
      : 0

    // Линия для верхнего предупреждающего порога
    const dangerousLineSeries = {
      name: `Опасно (выше ${maxWarning})`,
      type: 'line',
      data: dataSource.map(() => maxWarning),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'orange',
          type: 'dashed'
        },
        data: [{ yAxis: maxWarning }]
      },
      symbol: 'none'
    }

    // Линия для верхнего критического порога
    const criticalLineSeries = {
      name: `Критическое (выше ${maxCritical})`,
      type: 'line',
      data: dataSource.map(() => maxCritical),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'red',
          type: 'dashed'
        },
        data: [{ yAxis: maxCritical }]
      },
      symbol: 'none'
    }

    // Линия для нижнего предупреждающего порога
    const lowerDangerousLineSeries = {
      name: `Опасно (ниже ${minWarning})`,
      type: 'line',
      data: dataSource.map(() => minWarning),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'orange',
          type: 'dashed'
        },
        data: [{ yAxis: minWarning }]
      },
      symbol: 'none'
    }

    // Линия для нижнего критического порога
    const lowerCriticalLineSeries = {
      name: `Критическое (ниже ${minCritical})`,
      type: 'line',
      data: dataSource.map(() => minCritical),
      markLine: {
        silent: true,
        lineStyle: {
          color: 'red',
          type: 'dashed'
        },
        data: [{ yAxis: minCritical }]
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
            lt: minCritical,
            color: '#FD0100'
          },
          {
            gte: minCritical,
            lt: minWarning,
            color: '#FBDB0F'
          },
          {
            gt: maxCritical,
            color: '#FD0100'
          },
          {
            gte: maxWarning,
            lte: maxCritical,
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
          criticalLineSeries.name,
          lowerDangerousLineSeries.name,
          lowerCriticalLineSeries.name
        ]
      },
      series: [
        ...dataSeries,
        dangerousLineSeries,
        criticalLineSeries,
        lowerDangerousLineSeries,
        lowerCriticalLineSeries
      ]
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
