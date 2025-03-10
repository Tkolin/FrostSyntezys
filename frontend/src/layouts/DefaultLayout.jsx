import {
  BarChartOutlined,
  CompassOutlined,
  ExportOutlined,
  FileTextOutlined,
  ImportOutlined,
  InboxOutlined,
  LoginOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
const { Header, Content, Footer, Sider } = Layout
function getItem (label, key, icon, disabled, roles) {
  return {
    key,
    icon,
    disabled,
    roles,
    label
  }
}
const items = [
  getItem('Карта', '-1', <CompassOutlined />, true, ['ADMIN']),
  getItem('Импорт', '-2', <ImportOutlined />, true, ['ADMIN']),
  getItem('Экспорт', '-3', <ExportOutlined />, true, ['ADMIN']),
  getItem(
    'Список оборудования',
    'thermistor_chains',
    <InboxOutlined />,
    false,
    ['ADMIN']
  ),
  getItem('Список пользователей', 'user_list', <InboxOutlined />, false, [
    'ADMIN'
  ]),
  getItem('Список объектов', 'location_list', <InboxOutlined />, false, [
    'ADMIN'
  ]),
  getItem('Статистика', 'static', <BarChartOutlined />, false, [
    'ADMIN',
    'FIELD_TECH'
  ]),
  getItem('Визуализация', 'analytics', <PieChartOutlined />, false, [
    'FIELD_TECH',
    'CHIEF_ENGINEER',
    'ADMIN',
    'ANALYST'
  ]),
  getItem('Журнал', 'journal', <UnorderedListOutlined />, false, [
    'AD1MIN',
    'FIELD_TECH'
  ]),
  getItem('Документация', '-6', <FileTextOutlined />, true, ['ADMIN']),
  getItem('Настройки', '-7', <SettingOutlined />, true, [
    'ADMIN',
    'FIELD_TECH'
  ]),
  // getItem("Личный кабинет", "account", <UserOutlined />, false),
  getItem('Вход', 'login', <LoginOutlined />, false, ['GUEST']),
  getItem('Выход', 'exit', <LogoutOutlined />, false, ['FIELD_TECH'])
]
const DefaultLayout = ({ children, error }) => {
  const { user } = useUser()
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState('') // Для хранения текущего пути
  const location = useLocation() // Получаем текущий путь
  const navigate = useNavigate() // Для изменения пути
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  useEffect(() => {
    const routeName =
      items.find(item => item.key === location.pathname.slice(1))?.label ||
      'Главная'
    setBreadcrumb(routeName)
  }, [location])

  const checkRole = (role_ids, my_role_ids) => {
    if (role_ids?.includes('GUEST') && !my_role_ids) {
      return true
    }
    if (role_ids?.includes('ALL') || my_role_ids?.includes('ADMIN')) {
      return true
    }
    if (role_ids?.find(row => my_role_ids?.includes(row))) {
      return true
    } else {
      return false
    }
  }
  const filteredItems = useMemo(() => {
    return items.filter(item => checkRole(item.roles, user?.role_keys))
  }, [user])

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        theme='light'
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            color: '#2764FD'
          }}
        >
          {!collapsed ? (
            <img
              src='full_logo.svg'
              style={{
                height: '50px',
                color: '#2764FD',
                fill: '#2764FD'
              }}
            />
          ) : (
            <img src='logo.svg' style={{ height: '50px', color: '#2764FD' }} />
          )}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          mode='inline'
          items={filteredItems}
          onClick={e => navigate(e.key)}
          selectedKeys={[location.pathname.slice(1)]} // Выделение текущего пункта меню
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 32px'
          }}
        >
          <Breadcrumb
            style={{
              margin: '64px 0px 0px 0px'
            }}
          >
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
            {/* <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item> */}
          </Breadcrumb>
          <Typography.Title
            level={1}
            style={{
              margin: '0px 0px 32px 0px'
            }}
          >
            {breadcrumb}
          </Typography.Title>
          <div
            style={{
              minHeight: 360,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          ______ ©{new Date().getFullYear()} ______
        </Footer>
      </Layout>
    </Layout>
  )
}
export default DefaultLayout
