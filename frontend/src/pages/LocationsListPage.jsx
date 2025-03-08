import { Alert, Button, Card, Modal } from 'antd'
import { useState } from 'react'
import LocationForm from './components/forms/LocationForm'
import LocationTable from './components/tables/LocationTable'

const LocationsListPage = () => {
  const [createLocationStatus, setLocationModalStatus] = useState(false)
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список объектов (скважин)'></Alert>
        <Button onClick={() => setLocationModalStatus(true)}>
          Создать запись
        </Button>
        <LocationTable style={{ width: '100%' }}></LocationTable>
        <Modal
          open={createLocationStatus}
          onClose={() => setLocationModalStatus(null)}
          onCancel={() => setLocationModalStatus(null)}
          title={'Создание объекта'}
        >
          <LocationForm />
        </Modal>
      </Card>
    </div>
  )
}
export default LocationsListPage
