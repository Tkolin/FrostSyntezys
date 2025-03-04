import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import { DELETE_THERMISTOR_CHAIN } from '../../../gql/thermistorChain'

const MeteringThermistorChainsForm = ({
  InstalledThermistorChainsId,
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
    // Вызывайте мутацию удаления, если требуется:
    // mutate({ variables: { id } });
  }

  const handlePageChange = currentPage => {
    setPage(currentPage)
  }

  // Формирование колонок таблицы:
  const columns = useMemo(() => {
    if (!data || !data.InstalledThermistorChain) return []

    // Первая колонка – дата
    const baseColumns = [
      {
        title: 'Дата',
        dataIndex: 'date_metering',
        key: 'date_metering'
      }
    ]

    // Добавляем колонки для каждой точки по глубине
    data.InstalledThermistorChain.installed_thermistor_chain_points.forEach(
      point => {
        baseColumns.push({
          title: point.deep,
          dataIndex: `dp_${point.id}`, // ключ, по которому будут записаны значения измерений
          key: `dp_${point.id}`
        })
      }
    )

    // Колонка для действий
    baseColumns.push({
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
    })

    return baseColumns
  }, [data])

  // Трансформация исходных данных для таблицы
  const dataSource = useMemo(() => {
    if (!data || !data.InstalledThermistorChain) return []

    return data.InstalledThermistorChain.metering_thermistor_chains.map(
      measurement => {
        // Для каждой записи измерения создаём объект, где в свойстве date_metering хранится дата измерения
        const row = {
          id: measurement.id,
          date_metering: measurement.date_metering
        }

        // По каждой точке измерения заполняем соответствующее поле.
        // Ключ формируется как `dp_` + id установленной точки.
        measurement.metering_thermistor_chain_points.forEach(mp => {
          row[`dp_${mp.installed_thermistor_chain_point_id}`] = mp.value
        })

        return row
      }
    )
  }, [data])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
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
        {/* Здесь можно разместить форму редактирования */}
        <MeteringThermistorChainsForm id={modalEditId} />
      </Modal>
    </Space>
  )
}

export default MeteringThermistorChainsForm
