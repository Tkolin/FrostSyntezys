import { Alert, Button, Card } from 'antd'

const UserListPage = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <Alert message='Список пользователей'></Alert>
        <Button>Создать запись</Button>
        {/* <UserListTable style={{ width: '100%' }}></UserListTable> */}
      </Card>
    </div>
  )
}
export default UserListPage
