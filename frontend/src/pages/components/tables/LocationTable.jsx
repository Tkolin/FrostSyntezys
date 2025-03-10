import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DELETE_LOCATION, GET_LOCATIONS_PAGINATE } from '../../../gql/location'
import HasRole from '../components/HasRole'
import LocationForm from '../forms/LocationForm'

const LocationTable = ({ ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница

  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error, refetch } = useQuery(GET_LOCATIONS_PAGINATE, {
    variables: { first, page },
    onCompleted: resultData => {
      console.log('data11', resultData)
    }
  })
  useEffect(() => {
    refetch()
  }, [])

  const [mutate] = useMutation(DELETE_LOCATION)
  const handleDelete = id => {
    mutate({ variables: { id: id } })
    refetch()
  }
  const handlePageChange = pagination => {
    setPage(pagination)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Наименование',
      dataIndex: 'name'
    },
    {
      title: 'Координаты',
      key: 'characteristics',
      render: record => (
        <div>
          <div>
            <strong>x:</strong> {record.x}
          </div>
          <div>
            <strong>y:</strong> {record.y}
          </div>
        </div>
      )
    },

    {
      title: 'Действия',
      dataIndex: 'activity',
      render: (_, record) => (
        <Space.Compact>
          <HasRole roles={['CHIEF_ENGINEER']}>
            <Button
              type='link'
              icon={<SettingOutlined />}
              onClick={() => setModalEditId(record.id)}
            ></Button>
          </HasRole>
          <HasRole roles={['']}>
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
        dataSource={data?.LocationPaginated?.data}
        loading={loading}
        error={error}
        rowKey='id'
        pagination={{
          current: page,
          total: data?.LocationPaginated?.paginatorInfo?.total,
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
        <LocationForm id={modalEditId} onCompleted={refetch()} />
      </Modal>
    </Space>
  )
}
export default LocationTable
