import { useMutation, useQuery } from '@apollo/client'
import { Button, Divider, Form, Input, Select, Spin, notification } from 'antd'
import React from 'react'
import {
  CREATE_LOCATION,
  GET_LOCATION,
  UPDATE_LOCATION
} from '../../../gql/location'

const { Option } = Select

const LocationForm = ({ id, ...props }) => {
  const [form] = Form.useForm()

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    })
  }

  // Если id передан, загружаем данные для редактирования
  const {
    data,
    loading: queryLoading,
    error: queryError
  } = useQuery(GET_LOCATION, {
    variables: { id },
    skip: !id, // Не выполняем запрос, если id не передан (создание новой записи)
    onCompleted: resultData => {
      if (resultData && resultData.Location) {
        form.setFieldsValue(resultData.Location)
      }
    },
    onError: error => {
      openNotification('error', 'Ошибка загрузки', error.message)
    }
  })

  // Мутация для создания новой записи
  const [createLocation, { loading: createLoading }] = useMutation(
    CREATE_LOCATION,
    {
      onCompleted: resultData => {
        openNotification('success', 'Успешно', 'Термисторная цепь создана')
        form.resetFields()
      },
      onError: error => {
        openNotification('error', 'Ошибка создания', error.message)
      }
    }
  )

  // Мутация для обновления существующей записи
  const [updateLocation, { loading: updateLoading }] = useMutation(
    UPDATE_LOCATION,
    {
      onCompleted: resultData => {
        openNotification('success', 'Успешно', 'Термисторная цепь обновлена')
      },
      onError: error => {
        openNotification('error', 'Ошибка обновления', error.message)
      }
    }
  )

  const onFinish = values => {
    console.log('Значения формы:', values)
    if (!id) {
      createLocation({ variables: { ...values } })
    } else {
      updateLocation({ variables: { id, ...values } })
    }
  }

  if (queryLoading) return <Spin />

  return (
    <Form
      form={form}
      layout='horizontal'
      onFinish={onFinish}
      size='small'
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ measurement_range: 37 }}
    >
      <Form.Item label='Наименование' name='number'>
        <Input />
      </Form.Item>
      <Divider>Координаты</Divider>
      <Form.Item label='X' name='x'>
        <Input />
      </Form.Item>
      <Form.Item label='Y' name='y'>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          loading={createLoading || updateLoading}
        >
          {id ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LocationForm
