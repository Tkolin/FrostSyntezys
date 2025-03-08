import { Card } from 'antd'
import React from 'react'
import LoginForm from './components/forms/LoginForm'

const AuthPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', gap: '5px' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card style={{ minWidth: '410px' }}>
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
