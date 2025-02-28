import dayjs from 'dayjs'
import React from 'react'

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import DataSourceChart from './DataSourceChart'
import MeteringThermalChainTable from './tables/MeteringThermalChainTable'

dayjs.extend(isSameOrBefore)

const ManagerTPoint = ({ isCharsMode }) => {
  // Итерируем от dateStart до dateEnd (включительно) и добавляем колонку для каждого дня
  const dateEnd = dayjs()
  const dateStart = dayjs().subtract(7, 'day')

  const columns = [
    {
      title: '№ ТС',
      dataIndex: 'number'
    },
    {
      title: 'Глубина ТС, м',
      dataIndex: 'deep'
    }
  ]
  let currentDate = dayjs(dateStart)
  let dynamicDates = []
  while (currentDate.isSameOrBefore(dateEnd, 'day')) {
    dynamicDates.push(currentDate.format('YYYY-MM-DD'))
    columns.push({
      title: currentDate.format('DD.MM.YY'), // формат отображения заголовка
      dataIndex: currentDate.format('YYYY-MM-DD') // ключ данных, по которому потом можно сопоставлять данные
    })
    currentDate = currentDate.add(1, 'day')
  }
  const dataSource = Array.from({ length: 46 }).map((_, i) => {
    // Базовая информация
    const row = {
      key: i,
      number: `saaew ${i}`,
      deep: i, // случайная глубина
      datetime_edit: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      activity: '+'
    }

    // Для каждой даты добавляем поле с динамическим значением (например, случайно "+" или "–")
    dynamicDates.forEach(dateKey => {
      row[dateKey] = (Math.random() * 5).toFixed(1)
    })

    return row
  })

  if (isCharsMode)
    return (
      <div style={{ width: '100%' }}>
        <DataSourceChart dataSource={dataSource} dynamicDates={dynamicDates} />
      </div>
    )

  return (
    <MeteringThermalChainTable
      size='small'
      columns={columns}
      dataSource={dataSource}
    />
  )
}
export default ManagerTPoint
