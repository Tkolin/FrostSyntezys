// forecastUtils.js

/**
 * Линейная экстраполяция: рассчитывает среднее изменение между последовательными значениями.
 */
export const forecastLinear = (values, step) => {
  const n = values.length
  if (n > 1) {
    let diffSum = 0
    for (let j = 1; j < n; j++) {
      diffSum += values[j] - values[j - 1]
    }
    const avgDiff = diffSum / (n - 1)
    return values[n - 1] + avgDiff * step
  }
  return values[0]
}

/**
 * Наивный метод: прогноз равен последнему значению.
 */
export const forecastNaive = (values, step) => {
  return values[values.length - 1]
}

/**
 * Простое экспоненциальное сглаживание с коэффициентом α = 0.5.
 */
export const forecastExponential = (values, step) => {
  const alpha = 0.5
  let forecastExp = values[0]
  for (let j = 0; j < values.length; j++) {
    forecastExp = alpha * values[j] + (1 - alpha) * forecastExp
  }
  return forecastExp
}

/**
 * Полиномиальная регрессия (квадратичная аппроксимация методом наименьших квадратов).
 * При недостатке данных (меньше 3 точек) используется линейная экстраполяция.
 */
export const forecastPolynomial = (values, step) => {
  const n = values.length
  if (n < 3) {
    return forecastLinear(values, step)
  } else {
    let sumX = 0,
      sumX2 = 0,
      sumX3 = 0,
      sumX4 = 0
    let sumY = 0,
      sumXY = 0,
      sumX2Y = 0
    for (let j = 0; j < n; j++) {
      const x = j + 1 // индекс времени
      const y = values[j]
      sumX += x
      sumX2 += x * x
      sumX3 += x * x * x
      sumX4 += x * x * x * x
      sumY += y
      sumXY += x * y
      sumX2Y += x * x * y
    }
    const det =
      n * (sumX2 * sumX4 - sumX3 * sumX3) -
      sumX * (sumX * sumX4 - sumX2 * sumX3) +
      sumX2 * (sumX * sumX3 - sumX2 * sumX2)
    if (det === 0) {
      return forecastLinear(values, step)
    } else {
      const detC =
        sumY * (sumX2 * sumX4 - sumX3 * sumX3) -
        sumX * (sumXY * sumX4 - sumX3 * sumX2Y) +
        sumX2 * (sumXY * sumX3 - sumX2 * sumX2Y)
      const detB =
        n * (sumXY * sumX4 - sumX3 * sumX2Y) -
        sumY * (sumX * sumX4 - sumX2 * sumX3) +
        sumX2 * (sumX * sumX2Y - sumX2 * sumXY)
      const detA =
        n * (sumX2 * sumX2Y - sumX3 * sumXY) -
        sumX * (sumX * sumX2Y - sumX2 * sumXY) +
        sumY * (sumX * sumX3 - sumX2 * sumX2)
      const a = detA / det
      const b = detB / det
      const c = detC / det
      const xForecast = n + step
      return a * xForecast * xForecast + b * xForecast + c
    }
  }
}

/**
 * Метод скользящего среднего: прогноз равен среднему значению последних 3 наблюдений.
 */
export const forecastMovingAverage = (values, step) => {
  const windowSize = Math.min(3, values.length)
  const sum = values.slice(-windowSize).reduce((acc, val) => acc + val, 0)
  return sum / windowSize
}

/**
 * Метод Холта (двойное экспоненциальное сглаживание).
 * Использует параметры α и β для оценки уровня и тренда.
 */
export const forecastHolt = (values, step) => {
  const n = values.length
  if (n < 2) return values[0]
  const alpha = 0.8
  const beta = 0.2
  let level = values[0]
  let trend = values[1] - values[0]
  for (let i = 1; i < n; i++) {
    const current = values[i]
    const prevLevel = level
    level = alpha * current + (1 - alpha) * (level + trend)
    trend = beta * (level - prevLevel) + (1 - beta) * trend
  }
  return level + trend * step
}

/**
 * Сезонный наивный метод: использует значение из предыдущего сезона.
 * По умолчанию сезонная длина равна 7 (например, недельная сезонность).
 */
export const forecastSeasonalNaive = (values, step) => {
  const seasonLength = 7
  const n = values.length
  if (n < seasonLength) return forecastNaive(values, step)
  const index = (step - 1) % seasonLength
  return values[n - seasonLength + index]
}
