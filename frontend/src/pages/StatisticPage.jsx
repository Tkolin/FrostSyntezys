import { Alert, Button, Card, Form, Modal } from 'antd'
import { useState } from 'react'
import MeteringThermistorFilterPanel from './components/components/MeteringThermistorFilterPanel'
import InstalledThermalChainForm from './components/forms/InstalledThermalChainForm'
import InstalledThermalChainTable from './components/tables/InstalledThermalChainTree'
import MeteringThermistorChainsChart from './components/tables/MeteringThermistorChainsChart'
import MeteringThermistorChainsTable from './components/tables/MeteringThermistorChainsTable'

const StatisticPage = () => {
  const [thermalChainGroupSelected, setThermalChainGroupSelected] = useState([])
  const [
    installedThermalChainModalStatus,
    setInstalledThermalChainModalStatus
  ] = useState(false)
  const [isGraphMode, setIsGraphMode] = useState(false)

  // Создаём экземпляр формы, который передадим в фильтр
  const [form] = Form.useForm()

  // Отслеживаем значения из формы
  const displayRange = Form.useWatch('range', form)
  const isForecast = Form.useWatch('forecast', form)
  const forecastDays = Form.useWatch('forecastDays', form)
  const forecastMethod = Form.useWatch('forecastMethod', form)

  // Параметры для запроса данных (например, для таблицы или графика)
  const dateSourceParams = {
    dateStart: displayRange ? displayRange[0] : undefined,
    dateEnd: displayRange ? displayRange[1] : undefined,
    forecastDays: isForecast ? forecastDays : undefined,
    forecastMethod: isForecast ? forecastMethod : undefined
  }

  return (
    <div style={{ height: '100%', gap: '5px', display: 'flex' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Alert message='Список термакос' />
        {thermalChainGroupSelected}
        <InstalledThermalChainTable
          onSelectedRowKeys={setThermalChainGroupSelected}
        />
        <Button onClick={() => setInstalledThermalChainModalStatus(true)}>
          Зарегестрировать термокосу
        </Button>
        <Modal
          footer={null}
          open={installedThermalChainModalStatus}
          onClose={() => setInstalledThermalChainModalStatus(false)}
          onCancel={() => setInstalledThermalChainModalStatus(false)}
          title={'Регистрация термокосы на объекте'}
        >
          <InstalledThermalChainForm />
        </Modal>
      </Card>

      <div style={{ width: '100%' }}>
        {/* Используем вынесенный компонент фильтра */}
        <MeteringThermistorFilterPanel
          form={form}
          isGraphMode={isGraphMode}
          setIsGraphMode={setIsGraphMode}
        />
        {thermalChainGroupSelected?.map(row => (
          <Card key={row} style={{ width: '100%' }}>
            <Alert message={'Замеры по термокосе ' + row} />
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
