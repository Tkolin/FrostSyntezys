import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Select,
  Spin,
  notification
} from 'antd'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAIN } from '../../../gql/installedThermistorChain'
import { UPDATE_LOCATION } from '../../../gql/location'
import { CREATE_METERING_THERMISTOR_CHAIN } from '../../../gql/MeteringThermistorChain'

const { Option } = Select

const MeteringThermistorChainsForm = ({
  id,
  installedThermistorChainsId,
  ...props
}) => {
  const [form] = Form.useForm()

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    })
  }

  // Получаем данные термисторной цепи по переданному id
  const {
    data: dataInstalledThermistorChains,
    loading,
    error
  } = useQuery(GET_INSTALLED_THERMISTOR_CHAIN, {
    variables: { id: installedThermistorChainsId },
    onCompleted: resultData => {
      console.log('resultData', resultData)
    }
  })

  // Формируем элементы формы на основе точек, установленных в цепи
  const formItems = useMemo(() => {
    if (!dataInstalledThermistorChains) return []
    return dataInstalledThermistorChains?.InstalledThermistorChain?.installed_thermistor_chain_points.map(
      row => ({
        name: row.id,
        label: row.deep
      })
    )
  }, [dataInstalledThermistorChains])

  // Мутация для создания новой записи
  const [createLocation, { loading: createLoading }] = useMutation(
    CREATE_METERING_THERMISTOR_CHAIN,
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
    const payload = {
      installed_thermistor_chains_id: installedThermistorChainsId,
      date_metering: dayjs(values.date_metering).format('DD-MM-YYYY'),
      metering_thermistor_chain_points: Object.entries(values.points).map(
        ([key, row]) => ({
          installed_thermistor_chains_point_id: key, // Ключ объекта (аналог row["name"])
          value: row // Получаем значение по этому ключу
        })
      )
    }
    console.log('Значения формы:', payload)

    if (!id) {
      createLocation({ variables: { ...payload } })
    } else {
      updateLocation({ variables: { id, ...payload } })
    }
  }

  if (loading) return <Spin />
  if (error) return <div>Ошибка загрузки данных</div>

  return (
    <Form
      form={form}
      layout='horizontal'
      onFinish={onFinish}
      size='small'
      initialValues={{ measurement_range: 37 }}
    >
      <Form.Item label='Дата измерения' name='date_metering'>
        <DatePicker />
      </Form.Item>
      <Divider>Точки</Divider>

      {formItems.map(row => {
        return (
          <Form.Item
            key={row.name}
            label={row.label}
            name={['points', row.name]}
          >
            <InputNumber />
          </Form.Item>
        )
      })}
      <Form.Item>
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

export default MeteringThermistorChainsForm
