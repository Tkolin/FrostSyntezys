import { Alert, Button, Card, Modal } from 'antd';
import { useState } from 'react';
import ThermalChainForm from './components/forms/ThermalChainForm';
import ThermistorChainList from './ThermistorChainList'; // Импортируем новый компонент

const ThermistorChainsPage = () => {
  const [createThermalChainModalStatus, setCreateThermalChainModalStatus] = useState(false);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список существующих термакос (моделей)'></Alert>
        <Button onClick={() => setCreateThermalChainModalStatus(true)}>
          Создать запись
        </Button>

        {/* Заменяем ThermalChainTable на ThermistorChainList */}
        <ThermistorChainList />

        <Modal
          open={createThermalChainModalStatus}
          onCancel={() => setCreateThermalChainModalStatus(false)} // Исправлено: закрытие модального окна
          title={'Создание термокосы'}
          footer={null} // Убираем стандартные кнопки модального окна
        >
          <ThermalChainForm onSuccess={() => setCreateThermalChainModalStatus(false)} />
        </Modal>
      </Card>
    </div>
  );
};

export default ThermistorChainsPage;