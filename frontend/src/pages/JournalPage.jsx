import { Alert, Card } from 'antd'
import NotificationTable from './components/tables/NotificationTable'

const JournalPage = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Журнал событий'></Alert>
        <NotificationTable style={{ width: '100%' }} />
      </Card>
    </div>
  )
}
export default JournalPage
