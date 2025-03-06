import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { GET_NOTIFICATIONS_PAGINATED } from '../../../gql/Notification'
import { DELETE_THERMISTOR_CHAIN } from '../../../gql/thermistorChain'
import LocationForm from '../forms/LocationForm'

const NotificationTable = ({ ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница

  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS_PAGINATED, {
    variables: { first, page },
    onCompleted: resultData => {
      console.log('data11', resultData)
    }
  })
  const [mutate] = useMutation(DELETE_THERMISTOR_CHAIN)
  const handleDelete = () => {
    console.log('delete')
  }
  const handlePageChange = pagination => {
    setPage(pagination)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'ID точки термокосы',
      dataIndex: 'metering_thermistor_chain_point_id',
      key: 'metering_thermistor_chain_point_id'
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Дата начала',
      dataIndex: 'date_start',
      key: 'date_start'
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date_end',
      key: 'date_end'
    },
    {
      title: 'ID пользователя',
      dataIndex: 'user_id',
      key: 'user_id'
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    // {
    //   title: 'Точки измерений',
    //   dataIndex: 'metering_thermistor_chain_points',
    //   key: 'metering_thermistor_chain_points'
    // },
    {
      title: 'Действия',
      dataIndex: 'activity',
      render: (_, record) => (
        <Space.Compact>
          <Button
            type='link'
            icon={<SettingOutlined />}
            onClick={() => setModalEditId(record.id)}
          ></Button>
          <Button
            danger
            type='link'
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          ></Button>
        </Space.Compact>
      )
    }
  ]
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Table
        size={'small'}
        columns={columns}
        dataSource={data?.NotificationPaginated?.data}
        loading={loading}
        error={error}
        rowKey='id'
        pagination={{
          current: page,
          total: data?.NotificationPaginated?.paginatorInfo?.total,
          pageSize: first,
          onChange: handlePageChange
        }}
      />
      <Modal
        open={modalEditId}
        onClose={() => setModalEditId(null)}
        onCancel={() => setModalEditId(null)}
        title={'Управление термокосой'}
      >
        <LocationForm id={modalEditId} />
      </Modal>
    </Space>
  )
}
export default NotificationTable
