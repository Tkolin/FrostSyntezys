import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Divider,
  Form,
  InputNumber,
  Select,
  Spin,
  notification
} from 'antd'
import React from 'react'
import {
  CREATE_INSTALLED_THERMISTOR_CHAIN,
  GET_INSTALLED_THERMISTOR_CHAIN,
  UPDATE_INSTALLED_THERMISTOR_CHAIN
} from '../../../gql/installedThermistorChain'
import { GET_LOCATIONS } from '../../../gql/location'
import { GET_THERMISTOR_CHAINS } from '../../../gql/thermistorChain'

const InstalledThermalChainForm = ({ id, ...props }) => {
  const [form] = Form.useForm()

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    })
  }
  const {
    data: dataLocation,
    loading: queryLoadingLocation,
    error: queryErrorLocation
  } = useQuery(GET_LOCATIONS)
  const {
    data: dataThermistorChain,
    loading: queryLoadingThermistorChain,
    error: queryErrorThermistorChain
  } = useQuery(GET_THERMISTOR_CHAINS)
  // Если id передан, загружаем данные для редактирования
  const { loading: queryLoading } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id },
    skip: !id,
    onCompleted: resultData => {
      if (resultData && resultData.InstalledThermistorChain) {
        form.setFieldsValue(resultData.InstalledThermistorChain)
      }
    },
    onError: error => {
      openNotification('error', 'Ошибка загрузки', error.message)
    }
  })

  // Мутация для создания новой записи
  const [createInstalledThermalChain, { loading: createLoading }] = useMutation(
    CREATE_INSTALLED_THERMISTOR_CHAIN,
    {
      onCompleted: () => {
        openNotification('success', 'Успешно', 'Термисторная цепь создана')
        form.resetFields()
      },
      onError: error => {
        openNotification('error', 'Ошибка создания', error.message)
      }
    }
  )

  // Мутация для обновления существующей записи
  const [updateInstalledThermalChain, { loading: updateLoading }] = useMutation(
    UPDATE_INSTALLED_THERMISTOR_CHAIN,
    {
      onCompleted: () => {
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
      createInstalledThermalChain({ variables: { ...values } })
    } else {
      updateInstalledThermalChain({ variables: { id, ...values } })
    }
  }

  if (queryLoading) return <Spin />

  return (
    <Form form={form} layout='horizontal' onFinish={onFinish} size='small'>
      <Form.Item
        label='Термокоса'
        name='thermistor_chain_id'
        rules={[{ required: true, message: 'Пожалуйста, выберите Термокосу' }]}
      >
        <Select
          options={dataThermistorChain?.ThermistorChains?.map(row => ({
            value: row.id,
            label: row.name
          }))}
        />
      </Form.Item>
      <Form.Item
        label='Локация'
        name='location_id'
        rules={[{ required: true, message: 'Пожалуйста, выберите локацию' }]}
      >
        <Select
          options={dataLocation?.Locations?.map(row => ({
            value: row.id,
            label: row.name
          }))}
        />
      </Form.Item>

      <Divider>Параметры температур</Divider>
      <Form.Item
        label='Мин. температура предупреждения'
        name='min_warning_temperature'
        rules={[
          {
            required: true,
            message: 'Введите минимальную температуру предупреждения'
          }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Макс. температура предупреждения'
        name='max_warning_temperature'
        rules={[
          {
            required: true,
            message: 'Введите максимальную температуру предупреждения'
          }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Мин. критическая температура'
        name='min_critical_temperature'
        rules={[
          {
            required: true,
            message: 'Введите минимальную критическую температуру'
          }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Макс. критическая температура'
        name='max_critical_temperature'
        rules={[
          {
            required: true,
            message: 'Введите максимальную критическую температуру'
          }
        ]}
      >
        <InputNumber />
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

export default InstalledThermalChainForm
