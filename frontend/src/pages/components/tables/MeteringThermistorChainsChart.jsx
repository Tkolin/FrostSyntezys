import { useQuery } from '@apollo/client'
import { Space } from 'antd'
import ReactECharts from 'echarts-for-react' // Импорт компонента для ECharts
import React, { useMemo } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import {
  cutMeteringData,
  transformMeteringData
} from '../../../utils/dataUtils' // Импорт утилиты

const MeteringThermistorChainsForm = ({
  InstalledThermistorChainsId,
  dateStart,
  dateEnd,
  forecastDays,
  forecastMethod,
  ...props
}) => {
  const { data, loading, error } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: InstalledThermistorChainsId }
  })

  // Использование утилиты для трансформации данных
  const dataSource = useMemo(
    () =>
      cutMeteringData(
        transformMeteringData(data, forecastMethod, forecastDays),
        dateStart,
        dateEnd
      ),
    [data, forecastMethod, forecastDays, dateStart, dateEnd]
  )
  // Формирование опций для графика
  const chartOptions = useMemo(() => {
    if (dataSource.length === 0) return {}

    // Создаем маппинг ключей dp_<id> на глубину, если есть данные
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

    // Определяем имена серий (ключи) за исключением id и date_metering
    const seriesKeys = Object.keys(dataSource[0]).filter(
      key => key !== 'id' && key !== 'date_metering'
    )

    const series = seriesKeys.map(key => ({
      // Используем глубину из маппинга, если она есть
      name: depthMapping[key] || key,
      type: 'line',
      data: dataSource.map(row => row[key])
    }))

    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        // Легенда с отображением глубины
        data: seriesKeys.map(key => depthMapping[key] || key)
      },
      xAxis: {
        type: 'category',
        data: dataSource.map(row => row.date_metering)
      },
      yAxis: {
        type: 'value'
      },
      series
    }
  }, [dataSource, data])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* График на основе ECharts */}
      <ReactECharts
        option={chartOptions}
        style={{ height: '400px', width: '100%' }}
      />
    </Space>
  )
}

export default MeteringThermistorChainsForm
