import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  WarningFilled
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import {
  GET_NOTIFICATIONS_PAGINATED,
  SET_USER_IN_NOTIFICATION
} from '../../../gql/Notification'
import LocationForm from '../forms/LocationForm'

const NotificationStatusComponent = type => {
  switch (type.type) {
    case 'WARNING':
      return (
        <Space.Compact>
          <WarningFilled style={{ color: '#FFCE20' }} />
          Предупреждение
        </Space.Compact>
      )
    case 'DANGER':
      return (
        <Space.Compact>
          <CloseCircleFilled style={{ color: '#EE5D50' }} />
          Авария
        </Space.Compact>
      )
    case 'COMPLETED':
      return (
        <Space.Compact>
          <CheckCircleFilled style={{ color: '#05CD99' }} />
          Решена
        </Space.Compact>
      )
    default:
      return (
        <Space.Compact>
          <ExclamationCircleFilled style={{ color: '#A3A3A3' }} />
          Нет данных
        </Space.Compact>
      )
  }
}

const NotificationTable = ({ ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница
  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error, refetch } = useQuery(
    GET_NOTIFICATIONS_PAGINATED,
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
  const [setUserNotificatin] = useMutation(SET_USER_IN_NOTIFICATION)
  const handleDelete = () => {
    console.log('delete')
  }
  const handlePageChange = pagination => {
    setPage(pagination)
  }
  const handleAcknowledge = id => {
    setUserNotificatin({
      variables: {
        id: id,
        date_end: dayjs().format('DD-MM-YYYY HH:mm:ss'),
        user_id: -1
      }
    })
  }

  const columns = [
    {
      title: 'Угроза',
      dataIndex: 'id',
      render: (_, record) => (
        <div>
          {record.type_notification_key}
          <NotificationStatusComponent type={record.type_notification_key} />
        </div>
      )
    },
    {
      title: 'Объект',
      dataIndex: 'id',
      render: (_, record) =>
        record?.metering_thermistor_chain_point
          ?.installed_thermistor_chain_point?.installed_thermistor_chain
          ?.location?.name
    },
    {
      title: 'Устройство',
      dataIndex: 'id',
      render: (_, record) =>
        record?.metering_thermistor_chain_point
          ?.installed_thermistor_chain_point?.installed_thermistor_chain
          ?.thermistor_chain?.name
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Время начала',
      dataIndex: 'date_start',
      render: (_, record) =>
        record.date_start && dayjs(record.date_start).format('HH:mm DD.MM.YY')
    },
    {
      title: 'Время окончания',
      dataIndex: 'date_end',
      render: (_, record) =>
        record.date_end && dayjs(record.date_end).format('HH:mm DD.MM.YY')
    },

    {
      title: 'Исполнитель',
      dataIndex: 'activity',
      render: (_, record) => (
        <Space.Compact>
          {record.user_id ? (
            <Button type='link'>{record.user_id}</Button>
          ) : (
            <Button type='primary' onClick={() => handleAcknowledge(record.id)}>
              Квитировать
            </Button>
          )}
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
        footer={null}
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
