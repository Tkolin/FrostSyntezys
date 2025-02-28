import { AppstoreAddOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import RegisterThermalChainInGroup from './components/forms/RegisterThermalChainInGroupForm'
import ManagerTPoint from './components/ManagerTPoint'
import ThermalChainGroupTable from './components/tables/ThermalChainGroupTable'

const StatisticPage = () => {
  const [thermalChainGroupSelected, setThermalChainGroupSelected] = useState([])
  const [modalAddThermalChain, setModalAddThermalChain] = useState(false)
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

        <ThermalChainGroupTable
          changeSelectedThermalKos={setThermalChainGroupSelected}
        />
        <Button
          style={{ width: '100%' }}
          onClick={() => setModalAddThermalChain(true)}
        >
          +
        </Button>
        <Modal
          open={modalAddThermalChain}
          onClose={() => setModalAddThermalChain(false)}
          onCancel={() => setModalAddThermalChain(false)}
          title={'Регистрация термокосы'}
        >
          <RegisterThermalChainInGroup />
        </Modal>
        {thermalChainGroupSelected}
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
            <div style={{ width: '100%' }}>
              <ManagerTPoint isCharsMode={true} style={{ width: '100%' }} />
              <Button icon={<AppstoreAddOutlined />} style={{ heigth: '100%' }}>
                Внести данные вручную
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default StatisticPage
