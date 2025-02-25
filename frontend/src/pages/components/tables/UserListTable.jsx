import { SettingOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import UserListForm from '../forms/UserListForm'

const UserListTable = () => {
  const [modalEdit, setModalEdit] = useState(null)
  const [modalStatic, setModalStatic] = useState(null)

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'username'
    },
    {
      title: 'Почтовый ящик',
      dataIndex: 'email'
    },
    {
      title: 'Номер телефона',
      phone_number: 'phone_number'
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
  const dataSource = Array.from({
    length: 46
  }).map((_, i) => ({
    username: 'Имя ' + i + 1,
    email: 'почта' + i + 1 + '@mail.ru',
    phone_number: '81231231212',
    id: i + 1,
    number: `saaew ${i + 1}`,
    role: dayjs().toString(),
    activity: `+`
  }))

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Table size={'small'} columns={columns} dataSource={dataSource} />
      <Modal
        open={modalEdit}
        onClose={() => setModalEdit(null)}
        onCancel={() => setModalEdit(null)}
        title={'Управление пользователем'}
      >
        <UserListForm id={modalEdit} />
      </Modal>
    </Space>
  )
}
export default UserListTable
