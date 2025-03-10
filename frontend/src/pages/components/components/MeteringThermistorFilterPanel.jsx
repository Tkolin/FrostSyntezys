import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Space,
  Typography
} from 'antd'
import React from 'react'

// Компонент принимает форму, флаг графического режима и функцию для его смены
const MeteringThermistorFilterPanel = ({
  form,
  isGraphMode,
  setIsGraphMode
}) => {
  // Отслеживаем, включён ли прогноз (без повторного объявления useState)
  const isForecast = Form.useWatch('forecast', form)

  return (
    <Card style={{ width: '100%' }}>
      <Alert message='Настройка отображения датчиков' />
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Настройки отображения
      </Typography.Title>
      <Space.Compact style={{ marginBottom: 20 }}>
        <Button
          type={isGraphMode ? 'default' : 'primary'}
          onClick={() => setIsGraphMode(false)}
        >
          Таблицы
        </Button>
        <Button
          type={isGraphMode ? 'primary' : 'default'}
          onClick={() => setIsGraphMode(true)}
        >
          Графики
        </Button>
      </Space.Compact>
      <Form
        form={form}
        initialValues={{
          forecast: false,
          forecastDays: 1,
          forecastMethod: 'linear'
        }}
      >
        <Form.Item name='range'>
          <DatePicker.RangePicker />
        </Form.Item>
        <Space>
          <Form.Item name='forecast' valuePropName='checked'>
            <Checkbox>Прогнозировать</Checkbox>
          </Form.Item>
          {isForecast && (
            <>
              <Form.Item name='forecastDays'>
                <InputNumber min={1} placeholder='Кол-во дней' />
              </Form.Item>
              <Form.Item name='forecastMethod'>
                <Select
                  placeholder='Алгоритм прогнозирования'
                  options={[
                    { value: 'linear', label: 'Линейный' },
                    { value: 'holt', label: 'Метод Холта' }
                  ]}
                />
              </Form.Item>
            </>
          )}
        </Space>
      </Form>
    </Card>
  )
}

export default MeteringThermistorFilterPanel
