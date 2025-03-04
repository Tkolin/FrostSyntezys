import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import { DELETE_THERMISTOR_CHAIN } from '../../../gql/thermistorChain'
import {
  cutMeteringData,
  getColumnsMetering,
  transformMeteringData
} from '../../../utils/dataUtils'

const MeteringThermistorChainsForm = ({
  InstalledThermistorChainsId,
  dateStart,
  dateEnd,
  forecastDays,
  forecastMethod,
  ...props
}) => {
  const [page, setPage] = useState(1)
  const [modalEditId, setModalEditId] = useState(null)

  const { data, loading, error } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: InstalledThermistorChainsId }
  })

  const [mutate] = useMutation(DELETE_THERMISTOR_CHAIN)

  const handleDelete = id => {
    console.log('delete', id)
  }

  const handlePageChange = currentPage => {
    setPage(currentPage)
  }

  // Формирование колонок таблицы:
  const columns = useMemo(
    () => [
      ...getColumnsMetering(data),
      {
        title: 'Действия',
        key: 'actions',
        render: (_, record) => (
          <Space>
            <Button
              type='link'
              icon={<SettingOutlined />}
              onClick={() => setModalEditId(record.id)}
            />
            <Button
              danger
              type='link'
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        )
      }
    ],
    [data, setModalEditId, handleDelete]
  )

  // Трансформация исходных данных для таблицы
  const dataSource = useMemo(
    () =>
      cutMeteringData(
        transformMeteringData(data, forecastMethod, forecastDays),
        dateStart,
        dateEnd
      ),
    [data, forecastMethod, forecastDays, dateStart, dateEnd]
  )

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {forecastDays}
      {forecastMethod}
      <Table
        size='small'
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey='id'
        pagination={{ current: page, pageSize: 20, onChange: handlePageChange }}
      />
      <Modal
        open={!!modalEditId}
        onCancel={() => setModalEditId(null)}
        title='Управление термокосой'
        footer={null}
      >
        <MeteringThermistorChainsForm id={modalEditId} />
      </Modal>
    </Space>
  )
}

export default MeteringThermistorChainsForm
