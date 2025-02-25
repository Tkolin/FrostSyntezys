import { ConfigProvider } from 'antd'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import DefaultLayout from './layouts/DefaultLayout'
import AccountPage from './pages/AccountPage'
import AuthPage from './pages/AuthPage'
import JournalPage from './pages/JournalPage'
import StatisticPage from './pages/StatisticPage'
import ThermistorChainsPage from './pages/ThermistorChainsPage'
import UserListPage from './pages/UserListPage'
import AntdConfigProvider from './providers/AntdConfigProvider'
const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
   
`
const App = () => {
  // moment.locale("ru");
  return (
    <ConfigProvider>
      <GlobalStyles />
      <Router>
        <AntdConfigProvider>
          <DefaultLayout>
            <Routes>
              <Route path='/login' element={<AuthPage />} />
              <Route path='/static' element={<StatisticPage />} />
              <Route path='/journal' element={<JournalPage />} />
              <Route path='/user_list' element={<UserListPage />} />
              <Route
                path='/thermistor_chains'
                element={<ThermistorChainsPage />}
              />
              <Route path='/account' element={<AccountPage />} />
            </Routes>
          </DefaultLayout>
        </AntdConfigProvider>
      </Router>
    </ConfigProvider>
  )
}

export default App
