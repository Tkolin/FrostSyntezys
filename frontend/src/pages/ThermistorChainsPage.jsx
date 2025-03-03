import { Alert, Button, Card } from 'antd'
import ThermalChainTable from './components/tables/ThermalChainTable'

const ThermistorChainsPage = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список существующих термакос (моделей)'></Alert>
        <Button>Создать запись</Button>
        <ThermalChainTable style={{ width: '100%' }}></ThermalChainTable>
      </Card>
    </div>
  )
}
export default ThermistorChainsPage
