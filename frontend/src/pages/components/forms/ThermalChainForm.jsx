import { Button, Form, Input, InputNumber, Select, Slider } from 'antd'
import React from 'react'

const { Option } = Select

const ThermalChainForm = () => {
  const onFinish = values => {
    console.log('Form Values:', values)
  }
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: <strong>100°C</strong>
    }
  }
  return (
    <Form
      layout='horizontal'
      onFinish={onFinish}
      size='small'
      labelCol={{
        span: 12
      }}
      wrapperCol={{
        span: 12
      }}
    >
      <Form.Item label='Диапазон измерений (°C)' name='measurement_range'>
        <Slider marks={marks} included={false} defaultValue={37} />
      </Form.Item>

      <Form.Item label='Погрешность измерений (°C)' name='error_margin'>
        <Select>
          <Option value='0.1'>0.1 (-30°C до +10°C)</Option>
          <Option value='0.2'>0.2 (-40°C до -10°C; +10°C до +85°C)</Option>
          <Option value='0.3'>0.3 (-50°C до -40°C)</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Дискретность измерений (°C)'
        name='measurement_discreteness'
      >
        <InputNumber min={0.01} step={0.01} placeholder={0.01} />
      </Form.Item>

      <Form.Item
        label='Количество датчиков'
        name='sensor_count'
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={256} placeholder='до 256' />
      </Form.Item>

      <Form.Item
        label='Расстояние между датчиками (м)'
        name='sensor_distance'
        rules={[{ required: true }]}
      >
        <Select>
          <Option value='0.5'>0.5</Option>
          <Option value='1'>1</Option>
          <Option value='2'>2</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Внешние интерфейсы' name='external_interfaces'>
        <Select mode='multiple' placeholder={'LoRaWAN'}>
          <Option value='LoRaWAN'>LoRaWAN</Option>
          <Option value='NBIoT'>NBIoT</Option>
          <Option value='GPRS'>GPRS</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Дополнительные интерфейсы' name='additional_interfaces'>
        <Input placeholder='USB' />
      </Form.Item>

      <Form.Item label='Тип памяти данных' name='memory_type'>
        <Input placeholder='Flash' />
      </Form.Item>

      <Form.Item label='Тип антенны' name='antenna_type'>
        <Input placeholder='Внешняя' />
      </Form.Item>

      <Form.Item label='Тип батареи' name='battery_type'>
        <Input placeholder='Тип D Li-SOCl2' />
      </Form.Item>

      <Form.Item label='Количество батарей' name='battery_count'>
        <InputNumber min={1} max={10} placeholder={2} />
      </Form.Item>

      <Form.Item label='Габариты (мм)' name='dimensions'>
        <Input placeholder='D42x320' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ThermalChainForm
