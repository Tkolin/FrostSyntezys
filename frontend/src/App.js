import { ConfigProvider } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Home from "./pages/Home";
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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
