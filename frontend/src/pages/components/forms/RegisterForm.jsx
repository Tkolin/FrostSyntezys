import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { GET_ME, REGISTER_MUTATION } from '../../../gql/auth';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const { data, loadingD, refetch } = useQuery(GET_ME);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({ variables: formData });

      if (data && data.register) {
        const cookies = new Cookies();
        const accessToken = data.register.access_token;

        // Сохраняем токен в cookies
        cookies.set('accessToken', accessToken, {
          path: '/', // Доступен для всех путей
          maxAge: 3600, // Время жизни токена (в секундах)
          secure: true, // Только для HTTPS (если используется)
          sameSite: 'strict', // Защита от CSRF
        });

        console.log('Токен сохранён:', accessToken); // Логируем токен для отладки

        // Вызываем колбэк успешной регистрации
        if (onRegisterSuccess) {
          onRegisterSuccess(data.register.user);
        }
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error.message); // Логируем ошибку
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        onChange={(e) =>
          setFormData({ ...formData, password_confirmation: e.target.value })
        }
      />
      <button type="submit" disabled={loading}>
        Зарегистрироваться
      </button>
      <button onClick={() => refetch()}>Чекнуть</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

export default RegisterForm;