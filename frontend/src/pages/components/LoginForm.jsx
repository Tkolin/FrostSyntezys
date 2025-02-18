import { useMutation } from "@apollo/client";
import { Form, Input, message } from "antd";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import createCache from "../../gql/mutations/createCache";

const LoginForm = ({}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadingSecond, setLoadingSecond] = useState(false);
  // const { openNotification } = useContext(NotificationContext);
  const [login, { loading, error }] = useMutation(createCache, {
    onCompleted: () => {
      // openNotification("topRight", "success", "Вход выполнен!");
    },
  });

  const onFinish = async (values) => {
    const { email, password } = form.getFieldsValue(); // Извлекаем значения email и password из формы
    if (!email && !password) return;
    try {
      setLoadingSecond(true);
      //  Получение ответа
      const response = await login({
        variables: { input: { email, password } },
      });
      //  Распоковка ответа
      const { access_token, permissions, user } = response.data.login;
      //  Установка ответа в куки и локалсторадж
      const cookies = new Cookies();
      console.log("auth", access_token, response);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("userPermissions", JSON.stringify(permissions));
      //  Переход на главную страницу с перезагрузкой (для подключения localStorage)
      navigate("/");
      setLoadingSecond(false);
      window.location.reload();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      form={form}
      name="loginForm"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Пожалуйста введите email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {error && <p>Error: {error.message}</p>}
    </Form>
  );
};

export default LoginForm;
