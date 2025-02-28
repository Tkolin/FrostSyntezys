import { SettingOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Button, Modal, Space, Table } from 'antd'
import { loader } from 'graphql.macro'
import React, { useState } from 'react'
import ThermalChainForm from './../forms/ThermalChainForm'
const GET_THERMISTOR_CHAINS = loader(
  '../../../gql/queries/ThermistorChains.gql'
)
console.log(GET_THERMISTOR_CHAINS) // Убедитесь, что вывод не undefined

const ThermalChainTable = () => {
  const [modalEdit, setModalEdit] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)
  const { data, loading, error } = useQuery(GET_THERMISTOR_CHAINS)

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'number'
    },
    {
      title: 'Дата изменения',
      dataIndex: 'datetime_edit'
    },
    {
      title: 'Действия',
      dataIndex: 'activity',
      render: (_, record) => (
        <Space.Compact>
          <Button
            type='link'
            icon={<SettingOutlined />}
            onClick={() => setModalEdit(record.id)}
          ></Button>
        </Space.Compact>
      )
    }
  ]
  const dataSource = useQuery()

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Table size={'small'} columns={columns} dataSource={dataSource} />
      <Modal
        open={modalEdit}
        onClose={() => setModalEdit(null)}
        onCancel={() => setModalEdit(null)}
        title={'Управление термокосой'}
      >
        <ThermalChainForm id={modalEdit} />
      </Modal>
    </Space>
  )
}
export default ThermalChainTable
