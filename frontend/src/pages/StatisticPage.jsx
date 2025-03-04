import { Alert, Button, Card, Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import InstalledThermalChainForm from './components/forms/InstalledThermalChainForm'
import InstalledThermalChainTable from './components/tables/InstalledThermalChainTable'
import MeteringThermistorChainsTable from './components/tables/MeteringThermistorChainsTable'

const StatisticPage = () => {
  const [thermalChainGroupSelected, setThermalChainGroupSelected] = useState([])
  const [
    installedThermalChainModalStatus,
    setInstalledThermalChainModalStatus
  ] = useState(false)
  const [isGraphMode, setIsGraphMode] = useState(false)

  return (
    <div
      style={{
        height: '100%',
        gap: '5px',
        display: 'flex'
      }}
    >
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
          <Space.Compact>
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
          {/* <Calendar fullscreen={false} /> */}
        </Card>
        {thermalChainGroupSelected?.map(row => (
          <Card style={{ width: '100%' }}>
            <Alert message={'Замеры по термокосе ' + row}></Alert>
            <MeteringThermistorChainsTable InstalledThermistorChainsId={row} />
          </Card>
        ))}
      </div>
    </div>
  )
}
export default StatisticPage
