import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'

const ExitPage = () => {
  const navigate = useNavigate()
  const { user, refetch } = useUser()
  useEffect(() => {
    const cookies = new Cookies()
    cookies.remove('accessToken')
    if (!user) navigate('/login')
    window.location.reload()
  }, [navigate])

  return null // Компонент не рендерит интерфейс, т.к. сразу происходит переадресация
}

export default ExitPage
