import { useQuery } from '@apollo/client'
import React, { createContext, useContext } from 'react'
import { GET_ME } from '../gql/auth'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { data, loading, error, refetch } = useQuery(GET_ME)

  const user = data?.me

  return (
    <UserContext.Provider value={{ user, refetch }}>
      {children}
    </UserContext.Provider>
  )
}

// Кастомный хук для доступа к данным пользователя
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser должен использоваться внутри UserProvider')
  }
  return context
}
