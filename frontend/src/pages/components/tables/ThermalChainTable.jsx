import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  DELETE_THERMISTOR_CHAIN,
  GET_THERMISTOR_CHAINS_PAGINATE
} from '../../../gql/thermistorChain'
import HasRole from '../components/HasRole'
import ThermalChainForm from './../forms/ThermalChainForm'

const ThermalChainTable = ({ ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница

  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error, refetch } = useQuery(
    GET_THERMISTOR_CHAINS_PAGINATE,
    {
      variables: { first, page },
      onCompleted: resultData => {
        console.log('data11', resultData)
      }
    }
  )
  useEffect(() => {
    refetch()
  }, [])

  const [mutate] = useMutation(DELETE_THERMISTOR_CHAIN)
  const handleDelete = id => {
    mutate({ variables: { id: id } })
  }
  const handlePageChange = pagination => {
    setPage(pagination)
  }

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'number'
    },
    {
      title: 'Наименование',
      dataIndex: 'name'
    },
    {
      title: 'Характеристики',
      key: 'characteristics',
      render: record => (
        <div>
          <div>
            <strong>Тип антенны:</strong> {record.antenna_type}
          </div>
          <div>
            <strong>Тип батареи:</strong> {record.battery_type}
          </div>
          <div>
            <strong>Кол-во батарей:</strong> {record.battery_count}
          </div>
        </div>
      )
    },
    {
      title: 'Дополнительно',
      key: 'additional',
      render: record => (
        <div>
          <div>
            <strong>Доп. интерфейсы:</strong> {record.additional_interfaces}
          </div>
          <div>
            <strong>Внешние интерфейсы:</strong> {record.external_interfaces}
          </div>
          <div>
            <strong>Дата создания:</strong> {record.created_at}
          </div>
          <div>
            <strong>Размеры:</strong> {record.dimensions}
          </div>
          <div>
            <strong>Погрешность:</strong> {record.error_margin}
          </div>
        </div>
      )
    },
    {
      title: 'Действия',
      dataIndex: 'activity',
      render: (_, record) => (
        <Space.Compact>
          <HasRole roles={['FIELD_TECH', 'CHIEF_ENGINEER']}>
            <Button
              type='link'
              icon={<SettingOutlined />}
              onClick={() => setModalEditId(record.id)}
            ></Button>
          </HasRole>
          <HasRole roles={['FIELD_TECH', 'CHIEF_ENGINEER']}>
            <Button
              danger
              type='link'
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            ></Button>
          </HasRole>
        </Space.Compact>
      )
    }
  ]
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Table
        size={'small'}
        columns={columns}
        dataSource={data?.ThermistorChainPaginated?.data}
        loading={loading}
        error={error}
        rowKey='id'
        pagination={{
          current: page,
          total: data?.ThermistorChainPaginated?.paginatorInfo?.total,
          pageSize: first,
          onChange: handlePageChange
        }}
      />
      <Modal
        footer={null}
        open={modalEditId}
        onClose={() => setModalEditId(null)}
        onCancel={() => setModalEditId(null)}
        title={'Управление термокосой'}
      >
        <ThermalChainForm id={modalEditId} onCompleted={refetch()} />
      </Modal>
    </Space>
  )
}
export default ThermalChainTable
