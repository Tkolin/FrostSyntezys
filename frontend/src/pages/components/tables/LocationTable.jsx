import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { GET_LOCATIONS_PAGINATE } from '../../../gql/location'
import { DELETE_THERMISTOR_CHAIN } from '../../../gql/thermistorChain'
import LocationForm from '../forms/LocationForm'

const LocationTable = ({ ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница

  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error } = useQuery(GET_LOCATIONS_PAGINATE, {
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
export default LocationTable
