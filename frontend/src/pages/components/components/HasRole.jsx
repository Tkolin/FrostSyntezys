// components/HasRole.jsx
import React from 'react'
import { useUser } from '../../../providers/UserProvider'

const HasRole = ({ roles: requiredRoles, children }) => {
  const { user } = useUser()
  const userRoles = user?.role_keys || []
  if (userRoles.includes('ADMIN')) {
    return <>{children}</>
  }

  // Проверяем, есть ли у пользователя хотя бы одна из требуемых ролей
  const hasAccess = requiredRoles.some(role => userRoles.includes(role))

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}

export default HasRole
