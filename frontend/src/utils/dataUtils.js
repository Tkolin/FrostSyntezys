import {
  forecastExponential,
  forecastHolt,
  forecastLinear,
  forecastMovingAverage,
  forecastNaive,
  forecastPolynomial,
  forecastSeasonalNaive
} from './forecastUtils'
export const cutMeteringData = (data, dateStart, dateEnd) => {
  if (!data || !Array.isArray(data)) return []

  return data.filter(item => {
    const itemDate = new Date(item.date_metering)
    if (dateStart && itemDate < new Date(dateStart)) return false
    if (dateEnd && itemDate > new Date(dateEnd)) return false
    return true
  })
}

export const transformMeteringData = (
  data,
  mode = 'linear',
  forecastDays = 0
) => {
  if (!data || data.length <= 0) return []

  // Преобразование исходных данных
  let transformedData = data?.map(measurement => {
    const row = {
      id: measurement.id,
      date_metering: measurement.date_metering
    }
    measurement.metering_thermistor_chain_points.forEach(mp => {
      row[`dp_${mp.installed_thermistor_chain_point_id}`] = mp.value
    })
    return row
  })

  // Если указан метод прогнозирования и задано количество прогнозных дней,
  // добавляем прогнозные строки к данным
  if (forecastDays && mode) {
    // Определяем ключи сенсоров (исключая id и дату)
    let sensorKeys = []
    if (transformedData.length > 0) {
      sensorKeys = Object.keys(transformedData[0]).filter(
        key => key !== 'id' && key !== 'date_metering'
      )
    }
    const lastRow = transformedData[transformedData.length - 1]
    const forecastRows = []
    const lastDate = new Date(lastRow.date_metering)

    for (let i = 1; i <= forecastDays; i++) {
      const forecastDate = new Date(lastDate)
      forecastDate.setDate(forecastDate.getDate() + i)
      const forecastRow = {
        id: `forecast_${i}`,
        date_metering: forecastDate.toISOString().split('T')[0]
      }

      sensorKeys.forEach(key => {
        // Собираем исторические значения для данного сенсора
        const values = transformedData
          .map(row => Number(row[key]))
          .filter(v => !isNaN(v))
        let forecastValue = 0

        switch (mode) {
          case 'linear': {
            forecastValue = forecastLinear(values, i)
            break
          }
          case 'naive': {
            forecastValue = forecastNaive(values, i)
            break
          }
          case 'exponential': {
            forecastValue = forecastExponential(values, i)
            break
          }
          case 'polynomial': {
            forecastValue = forecastPolynomial(values, i)
            break
          }
          case 'movingAverage': {
            forecastValue = forecastMovingAverage(values, i)
            break
          }
          case 'holt': {
            forecastValue = forecastHolt(values, i)
            break
          }
          case 'seasonalNaive': {
            forecastValue = forecastSeasonalNaive(values, i)
            break
          }
          default: {
            forecastValue = forecastLinear(values, i)
          }
        }

        forecastValue = Number(forecastValue.toFixed(3))
        forecastRow[key] = forecastValue
      })
      forecastRows.push(forecastRow)
    }
    transformedData = transformedData.concat(forecastRows)
  }
  return transformedData
}

export const getColumnsMetering = data => {
  if (!data || data.length <= 0) return []

  // Первая колонка – дата
  const baseColumns = [
    {
      title: 'Дата',
      dataIndex: 'date_metering',
      key: 'date_metering'
    }
  ]

  // Добавляем колонки для каждой точки по глубине
  data?.forEach(point => {
    baseColumns.push({
      title: point.deep,
      dataIndex: `dp_${point.id}`, // ключ, по которому будут записаны значения измерений
      key: `dp_${point.id}`
    })
  })

  return baseColumns
}
