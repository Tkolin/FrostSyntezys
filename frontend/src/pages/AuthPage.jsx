import { Card } from 'antd'
import React from 'react'
import RegisterForm from './components/forms/RegisterForm'

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
        <Card style={{ minWidth: '410px' }}>{/* <LoginForm /> */}</Card>
      </div>
      <RegisterForm />
      {/* <div  style={{height: "100vh"}}>
        
        <img src="/login_holst.svg" style={{height: "100%"}}></img>
  </div> */}
    </div>
  )
}

export default AuthPage
