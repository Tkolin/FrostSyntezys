import { Alert, Card } from 'antd'
import UserListTable from './components/tables/UserListTable'

const UserListPage = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список существующих термакос (моделей)'></Alert>
        <UserListTable style={{ width: '100%' }}></UserListTable>
      </Card>
    </div>
  )
}
export default UserListPage
