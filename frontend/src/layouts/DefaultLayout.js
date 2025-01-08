import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddDocumentIcon from "../icons/AddDocumentIcon";
import ExportIcon from "../icons/ExportIcon";
import ImageIcon from "../icons/ImageIcon";
import ListIcon from "../icons/ListIcon";
import MapIcon from "../icons/MapIcon";
import StaticIcon from "../icons/StaticIcon";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, disabled, children) {
  return {
    key,
    icon,
    disabled,
    children,
    label,
  };
}
const items = [
  getItem("Карта", "-1", <MapIcon />, true),
  getItem("Импорт", "-2", <ExportIcon />, true),
  getItem("Статистика", "1", <StaticIcon />, false),
  getItem("Визуализация", "-4", <ImageIcon />, true),
  getItem("Журнал", "2", <ListIcon />, false),
  getItem("Документация", "-6", <AddDocumentIcon />, true),
  getItem("Настройки", "-7", <ImageIcon />, true),
  getItem("Личный кабинет", "", <ImageIcon />, false),
];
const DefaultLayout = ({ children, error }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState(""); // Для хранения текущего пути
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate(); // Для изменения пути

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // Обновляем хлебные крошки на основе текущего маршрута
    const routeName =
      items.find((item) => item.key === location.pathname.slice(1))?.label ||
      "Главная";
    setBreadcrumb(routeName);
  }, [location]);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {" "}
          {!collapsed ? (
            <img src="full_logo.svg" style={{ height: "50px" }} />
          ) : (
            <img src="logo.svg" style={{ height: "50px" }} />
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(e) => navigate(e.key)}
          selectedKeys={[location.pathname.slice(1)]} // Выделение текущего пункта меню
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ______ ©{new Date().getFullYear()} ______
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
