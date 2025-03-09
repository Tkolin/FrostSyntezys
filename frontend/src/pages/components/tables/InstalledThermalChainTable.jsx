import { SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAINS_PAGINATE } from '../../../gql/installedThermistorChain'
import { DELETE_THERMISTOR_CHAIN } from '../../../gql/thermistorChain'
import InstalledThermalChainForm from '../forms/InstalledThermalChainForm'

const InstalledThermalChainTable = ({ onSelectedRowKeys, ...props }) => {
  const [first] = useState(20) // например, 10 записей на страницу
  const [page, setPage] = useState(1) // текущая страница

  const [modalEditId, setModalEditId] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error, refetch } = useQuery(
    GET_INSTALLED_THERMISTOR_CHAINS_PAGINATE,
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
  const handleDelete = () => {
    console.log('delete')
  }
  const handlePageChange = pagination => {
    setPage(pagination)
  }

  const columns = [
    {
      title: 'Термокоса',
      render: (_, record) => record.thermistor_chain.name
    },
    {
      title: 'Локация',
      render: (_, record) => record.location.name
    },
    {
      title: 'Min',
      dataIndex: 'min_critical_temperature'
    },
    {
      title: 'Max',
      dataIndex: 'max_critical_temperature'
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
        </Space.Compact>
      )
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectedRowKeys && onSelectedRowKeys(selectedRowKeys)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Table
        size={'small'}
        columns={columns}
        dataSource={data?.InstalledThermistorChainPaginated?.data}
        loading={loading}
        error={error}
        rowKey='id'
        rowSelection={{
          ...rowSelection
        }}
        pagination={{
          current: page,
          total: data?.InstalledThermistorChainPaginated?.paginatorInfo?.total,
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
        <InstalledThermalChainForm id={modalEditId} onCompleted={refetch()} />
      </Modal>
    </Space>
  )
}
export default InstalledThermalChainTable
