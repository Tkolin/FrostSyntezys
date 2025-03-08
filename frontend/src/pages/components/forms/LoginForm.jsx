import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, notification } from 'antd'
import React from 'react'
import { Cookies } from 'react-cookie'
import { GET_ME, LOGIN_MUTATION } from '../../../gql/auth'

const LoginForm = ({ onLoginSuccess }) => {
  const [form] = Form.useForm()
  const cookies = new Cookies()
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    })
  }

  // Запрос для получения текущего пользователя
  const { data, loading: loadingMe, refetch } = useQuery(GET_ME)

  // Мутация для логина
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: data => {
      if (data?.login?.access_token) {
        cookies.set('accessToken', data.login.access_token, { path: '/' })
        openNotification('success', 'Успешно', 'Вход выполнен')
        onLoginSuccess && onLoginSuccess(data.login.user)
      }
    },
    onError: error => {
      openNotification('error', 'Ошибка загрузки', error.message)
    }
  })

  // Отправка формы
  const handleSubmit = async values => {
    try {
      await login({ variables: values })
    } catch (err) {
      console.error('Ошибка входа:', err)
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item
        name='name'
        label='Логин'
        rules={[{ required: true, message: 'Введите логин!' }]}
      >
        <Input placeholder='Логин' />
      </Form.Item>

      <Form.Item
        name='password'
        label='Пароль'
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          Вход
        </Button>
        <Button disabled style={{ marginLeft: 10 }}>
          Запросить пароль
        </Button>
      </Form.Item>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </Form>
  )
}

export default LoginForm
