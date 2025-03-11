import {
  ApolloClient,
  ApolloProvider as ApolloHooksProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useMemo } from 'react';
import { Cookies } from 'react-cookie';

// Создаём HTTP-ссылку для Apollo Client
const httpLink = createHttpLink({
  uri: 'http://192.168.0.11:8000/graphql', // Укажите правильный URL
});

// Функция для создания Apollo Client
const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies();
    const token = localStorage.getItem('accessToken') || cookies.get('accessToken');
    console.log('Токен в аполо:', token); // Логируем токен для отладки

    // Возвращаем заголовки с токеном, если он есть
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '', // Передаём токен в заголовке
      },
    };
  });

  // Создаём Apollo Client с настроенной ссылкой и кэшем
  return new ApolloClient({
    link: authLink.concat(httpLink), // Объединяем authLink и httpLink
    cache: new InMemoryCache(), // Используем InMemoryCache для кэширования
  });
};

// Компонент ApolloProvider
const ApolloProvider = ({ children }) => {
  // Используем useMemo, чтобы Apollo Client создавался только один раз
  const client = useMemo(() => createApolloClient(), []);
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};

export default ApolloProvider;