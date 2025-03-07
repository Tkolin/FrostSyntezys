import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Cookies } from 'react-cookie'
import { GET_ME, REGISTER_MUTATION } from '../../../gql/auth'

const RegisterForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION)
  const { data, loadingD, refetch } = useQuery(GET_ME)

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await register({ variables: formData })
    if (data) {
      const cookies = new Cookies()
      console.log('accessToken', data.register.access_token)
      cookies.set('accessToken', data.register.access_token)
      onRegisterSuccess && onRegisterSuccess(data.register.user)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Имя'
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type='email'
        placeholder='Email'
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type='password'
        placeholder='Пароль'
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type='password'
        placeholder='Повторите пароль'
        onChange={e =>
          setFormData({ ...formData, password_confirmation: e.target.value })
        }
      />
      <button type='submit' disabled={loading}>
        Зарегистрироваться
      </button>
      <button onClick={() => refetch()}>Чекнуть</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  )
}

export default RegisterForm
