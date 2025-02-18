import { ConfigProvider } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import DefaultLayout from "./layouts/DefaultLayout";
import AuthPage from "./pages/AuthPage";
import JournalPage from "./pages/JournalPage";
import StatisticPage from "./pages/StatisticPage";
import AntdConfigProvider from "./providers/AntdConfigProvider";
const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
 
`;
const App = () => {
  // moment.locale("ru");
  return (
    <ConfigProvider>
      <GlobalStyles />
      <Router>
        <AntdConfigProvider>
          <DefaultLayout>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/static" element={<StatisticPage />} />
              <Route path="/journal" element={<JournalPage />} />
            </Routes>
          </DefaultLayout>
        </AntdConfigProvider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
