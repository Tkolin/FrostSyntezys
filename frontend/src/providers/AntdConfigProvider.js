import { ConfigProvider } from "antd";
import React from "react";

const AntdConfigProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#2764FD",
      },
      components: {
        Layout: {
          bodyBg: "#F4FAFE",
        },

        Text: {
          color: "#2B3674",
        },
        Button: {
          colorPrimary: "#2764FD",
          algorithm: true, // Enable algorithm
        },
        Input: {
          colorPrimary: "#2764FD",
          algorithm: true, // Enable algorithm
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdConfigProvider;
