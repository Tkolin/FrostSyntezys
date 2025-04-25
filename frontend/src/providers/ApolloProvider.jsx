import {
  ApolloClient,
  ApolloProvider as ApolloHooksProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React, { useMemo } from 'react'
import { Cookies } from 'react-cookie'

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/'
})

const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies()
    const token = cookies.get('accessToken')
    if (!token) {
      console.log('Отправляю на авторизацию')
    }
    console.log('Токен в аполо ' + token)
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

const ApolloProvider = ({ children }) => {
  const client = useMemo(() => createApolloClient(), [])
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
}

export default ApolloProvider
