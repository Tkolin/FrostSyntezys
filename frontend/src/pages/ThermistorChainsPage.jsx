import { Alert, Button, Card, Modal } from 'antd'
import { useState } from 'react'
import ThermalChainForm from './components/forms/ThermalChainForm'
import ThermalChainTable from './components/tables/ThermalChainTable'

const ThermistorChainsPage = () => {
  const [createThermalChainModalStatus, setCreateThermalChainModalStatus] =
    useState(false)
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список существующих термакос (моделей)'></Alert>
        <Button onClick={() => setCreateThermalChainModalStatus(true)}>
          Создать запись
        </Button>
        <ThermalChainTable style={{ width: '100%' }}></ThermalChainTable>
        <Modal footer={null}
          open={createThermalChainModalStatus}
          onClose={() => setCreateThermalChainModalStatus(null)}
          onCancel={() => setCreateThermalChainModalStatus(null)}
          title={'Создание термокосы'}
        >
          <ThermalChainForm />
        </Modal>
      </Card>
    </div>
  )
}
export default ThermistorChainsPage
