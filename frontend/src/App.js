import { ConfigProvider } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import JournalPage from "./pages/JournalPage";
import StatisticPage from "./pages/StatisticPage";
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
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="1" element={<StatisticPage />} />
            <Route path="2" element={<JournalPage />} />
          </Routes>
        </DefaultLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
