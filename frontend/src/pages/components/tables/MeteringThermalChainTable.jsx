import { Table } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const MeteringThermalChainTable = ({
  dataSource = {},
  dateEnd = dayjs(),
  dateStart = dayjs().subtract(7, 'day'),
  data = [],
  columns = [],
}) => {


  // Итерируем от dateStart до dateEnd (включительно) и добавляем колонку для каждого дня

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      }
    ]
  }

  return (
    <Table
      size='small'
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
    />
  )
}
export default MeteringThermalChainTable
