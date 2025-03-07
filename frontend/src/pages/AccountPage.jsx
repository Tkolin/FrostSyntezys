import { Card } from 'antd'
import RegisterForm from './components/forms/RegisterForm'

const AccountPage = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex'
      }}
    >
      <Card style={{ width: '100%' }}>
        <RegisterForm />
        {/* <Alert message="Журнал событий"></Alert>
        <RequestTable  style={{ width: "100%" }}></RequestTable> */}
      </Card>
    </div>
  )
}
export default AccountPage
