import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
  Space,
  Typography
} from 'antd'
import { useState } from 'react'
import InstalledThermalChainForm from './components/forms/InstalledThermalChainForm'
import InstalledThermalChainTable from './components/tables/InstalledThermalChainTable'
import MeteringThermistorChainsChart from './components/tables/MeteringThermistorChainsChart'
import MeteringThermistorChainsTable from './components/tables/MeteringThermistorChainsTable'

const StatisticPage = () => {
  const [thermalChainGroupSelected, setThermalChainGroupSelected] = useState([])
  const [
    installedThermalChainModalStatus,
    setInstalledThermalChainModalStatus
  ] = useState(false)
  const [isGraphMode, setIsGraphMode] = useState(false)

  const [form] = Form.useForm()

  // Используем Form.useWatch для отслеживания изменений
  const displayRange = Form.useWatch('range', form)
  const isForecast = Form.useWatch('forecast', form)
  const forecastDays = Form.useWatch('forecastDays', form)
  const forecastMethod = Form.useWatch('forecastMethod', form)

  const dateSourceParams = {
    dateStart: displayRange ? displayRange[0] : undefined,
    dateEnd: displayRange ? displayRange[1] : undefined,
    forecastDays: isForecast ? forecastDays : undefined,
    forecastMethod: isForecast ? forecastMethod : undefined
  }

  return (
    <div style={{ height: '100%', gap: '5px', display: 'flex' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Alert message='Список термакос'></Alert>
        {thermalChainGroupSelected}
        <InstalledThermalChainTable
          onSelectedRowKeys={setThermalChainGroupSelected}
        />
        <Button onClick={() => setInstalledThermalChainModalStatus(true)}>
          Зарегестрировать термокосу
        </Button>
        <Modal
          open={installedThermalChainModalStatus}
          onClose={() => setInstalledThermalChainModalStatus(null)}
          onCancel={() => setInstalledThermalChainModalStatus(null)}
          title={'Создание термокосы'}
        >
          <InstalledThermalChainForm />
        </Modal>
      </Card>

      <div style={{ width: '100%' }}>
        <Card style={{ width: '100%' }}>
          <Alert message='Настройка отображения датчиков'></Alert>
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
                        // { value: 'naive', label: 'Наивный' },
                        // {
                        //   value: 'exponential',
                        //   label: 'Экспоненциальное сглаживание'
                        // },
                        // {
                        //   value: 'polynomial',
                        //   label: 'Полиномиальная регрессия'
                        // },
                        // { value: 'movingAverage', label: 'Скользящее среднее' },
                        { value: 'holt', label: 'Метод Холта' }
                        // { value: 'seasonalNaive', label: 'Сезонный наивный' }
                      ]}
                    />
                  </Form.Item>
                </>
              )}
            </Space>
          </Form>
        </Card>
        {thermalChainGroupSelected?.map(row => (
          <Card key={row} style={{ width: '100%' }}>
            <Alert message={'Замеры по термокосе ' + row}></Alert>
            {!isGraphMode ? (
              <MeteringThermistorChainsTable
                {...dateSourceParams}
                installedThermistorChainsId={row}
              />
            ) : (
              <MeteringThermistorChainsChart
                {...dateSourceParams}
                installedThermistorChainsId={row}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StatisticPage
