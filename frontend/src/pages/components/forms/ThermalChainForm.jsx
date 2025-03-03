import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Spin,
  notification
} from 'antd'
import React from 'react'
import {
  CREATE_THERMISTOR_CHAIN,
  GET_THERMISTOR_CHAIN,
  UPDATE_THERMISTOR_CHAIN
} from '../../../gql/thermistorChain'

const { Option } = Select

const ThermalChainForm = ({ id, ...props }) => {
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
  } = useQuery(GET_THERMISTOR_CHAIN, {
    variables: { id },
    skip: !id, // Не выполняем запрос, если id не передан (создание новой записи)
    onCompleted: resultData => {
      if (resultData && resultData.ThermistorChain) {
        form.setFieldsValue(resultData.ThermistorChain)
      }
    },
    onError: error => {
      openNotification('error', 'Ошибка загрузки', error.message)
    }
  })

  // Мутация для создания новой записи
  const [createThermistorChain, { loading: createLoading }] = useMutation(
    CREATE_THERMISTOR_CHAIN,
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
  const [updateThermistorChain, { loading: updateLoading }] = useMutation(
    UPDATE_THERMISTOR_CHAIN,
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
      createThermistorChain({ variables: { ...values } })
    } else {
      updateThermistorChain({ variables: { id, ...values } })
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
      <Form.Item label='Номер' name='number'>
        <Input />
      </Form.Item>

      <Form.Item label='Наименование' name='name'>
        <Input />
      </Form.Item>

      <Form.Item label='Количество точек' name='point_count'>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item label='Шаг точек' name='point_step'>
        <InputNumber step={0.1} />
      </Form.Item>

      <Form.Item label='Диапазон измерений' name='measurement_range'>
        <Slider min={0} max={100} marks={{ 0: '0°C', 100: '100°C' }} />
      </Form.Item>

      <Form.Item label='Погрешность измерений' name='error_margin'>
        <InputNumber step={0.01} />
      </Form.Item>

      <Form.Item label='Дискретность измерений' name='measurement_discreteness'>
        <InputNumber step={0.01} />
      </Form.Item>

      <Form.Item label='Количество сенсоров' name='sensor_count'>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item label='Расстояние между сенсорами' name='sensor_distance'>
        <InputNumber step={0.1} />
      </Form.Item>

      <Form.Item label='Внешние интерфейсы' name='external_interfaces'>
        <Input />
      </Form.Item>

      <Form.Item label='Доп. интерфейсы' name='additional_interfaces'>
        <Input />
      </Form.Item>

      <Form.Item label='Тип памяти' name='memory_type'>
        <Input />
      </Form.Item>

      <Form.Item label='Тип антенны' name='antenna_type'>
        <Input />
      </Form.Item>

      <Form.Item label='Тип батареи' name='battery_type'>
        <Input />
      </Form.Item>

      <Form.Item label='Количество батарей' name='battery_count'>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item label='Габариты' name='dimensions'>
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

export default ThermalChainForm
