import { useQuery } from '@apollo/client'
import { Alert, Card, Form } from 'antd'
import { useState } from 'react'
import { GET_INSTALLED_THERMISTOR_CHAINS } from '../gql/installedThermistorChain'
import { useUser } from '../providers/UserProvider'
import MeteringThermistorFilterPanel from './components/components/MeteringThermistorFilterPanel'
import MeteringThermistorChainsChart from './components/tables/MeteringThermistorChainsChart'
import MeteringThermistorChainsTable from './components/tables/MeteringThermistorChainsTable'

const StatisticPage = () => {
  const { data, loading, error } = useQuery(GET_INSTALLED_THERMISTOR_CHAINS)
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
  const { user } = useUser()

  return (
    <div style={{ height: '100%', gap: '5px', display: 'flex' }}>
      <div>Привет, {user ? user.name : 'Гость'}!</div>

      <div style={{ width: '100%' }}>
        {/* Используем вынесенный компонент фильтра */}
        <MeteringThermistorFilterPanel
          form={form}
          isGraphMode={isGraphMode}
          setIsGraphMode={setIsGraphMode}
        />
        {data?.InstalledThermistorChains?.map(row => (
          <Card key={row} style={{ width: '100%' }}>
            <Alert message={'Замеры по термокосе ' + row.id} />
            {!isGraphMode ? (
              <MeteringThermistorChainsTable
                {...dateSourceParams}
                installedThermistorChainsId={row.id}
              />
            ) : (
              <MeteringThermistorChainsChart
                {...dateSourceParams}
                installedThermistorChainsId={row.id}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StatisticPage
