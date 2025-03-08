import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
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
import MeteringThermistorChainsForm from '../forms/MeteringThermistorChainsForm'

const MeteringThermistorChainsTable = ({
  installedThermistorChainsId,
  dateStart,
  dateEnd,
  forecastDays,
  forecastMethod,
  ...props
}) => {
  const [page, setPage] = useState(1)
  // modalEditId используется для редактирования записи, а modalVisible для создания новой
  const [modalEditId, setModalEditId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const { data, loading, error } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: installedThermistorChainsId }
  })

  const [mutate] = useMutation(DELETE_THERMISTOR_CHAIN)

  const handleDelete = id => {
    console.log('delete', id)
    // Здесь можно вызвать мутацию DELETE_THERMISTOR_CHAIN:
    // mutate({ variables: { id } });
  }

  const handlePageChange = currentPage => {
    setPage(currentPage)
  }

  // Формирование колонок таблицы: получаем колонки на основе точек
  const columns = useMemo(
    () => [
      ...getColumnsMetering(
        data?.InstalledThermistorChain?.installed_thermistor_chain_points
      ),
      {
        title: 'Действия',
        key: 'actions',
        render: (_, record) => (
          <Space>
            <Button
              type='link'
              icon={<SettingOutlined />}
              onClick={() => {
                setModalEditId(record.id)
                setModalVisible(true)
              }}
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
  const dataSource = useMemo(() => {
    if (!data) return []
    return cutMeteringData(
      transformMeteringData(
        data?.InstalledThermistorChain?.metering_thermistor_chains,
        forecastMethod,
        forecastDays
      ),
      dateStart,
      dateEnd
    )
  }, [data, forecastMethod, forecastDays, dateStart, dateEnd])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* Кнопка для создания новой записи */}
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => {
          setModalEditId(null)
          setModalVisible(true)
        }}
      >
        Добавить запись
      </Button>

      <Modal footer={null}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        title='Управление термокосой'
        footer={null}
      >
        <MeteringThermistorChainsForm
          installedThermistorChainsId={installedThermistorChainsId}
          onCompleted={() => {
            setModalVisible(false)
          }}
        />
      </Modal>
      <Table
        size='small'
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey='id'
        pagination={{ current: page, pageSize: 20, onChange: handlePageChange }}
      />
    </Space>
  )
}

export default MeteringThermistorChainsTable
