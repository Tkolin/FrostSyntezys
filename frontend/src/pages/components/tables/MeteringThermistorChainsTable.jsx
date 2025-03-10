import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import { DELETE_METERING_THERMISTOR_CHAIN } from '../../../gql/MeteringThermistorChain'
import {
  cutMeteringData,
  getColumnsMetering,
  transformMeteringData
} from '../../../utils/dataUtils'
import HasRole from '../components/HasRole'
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

  const { data, loading, error, refetch } = useQuery(
    GET_INSTALLED_THERMISTOR_CHAIN,
    {
      variables: { id: installedThermistorChainsId }
    }
  )
  useEffect(() => {
    refetch()
  }, [])
  const [deleteMutate] = useMutation(DELETE_METERING_THERMISTOR_CHAIN)

  const handleDelete = id => {
    deleteMutate({ variables: { id: id } })
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
            <HasRole roles={['FIELD_TECH', 'CHIEF_ENGINEER']}>
              <Button
                type='link'
                icon={<SettingOutlined />}
                onClick={() => {
                  setModalEditId(record.id)
                  setModalVisible(true)
                }}
              />
            </HasRole>
            <HasRole roles={['']}>
              <Button
                danger
                type='link'
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </HasRole>
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

      <Modal
        footer={null}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        title='Управление термокосой'
      >
        <MeteringThermistorChainsForm
          installedThermistorChainsId={installedThermistorChainsId}
          onCompleted={refetch()}
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
