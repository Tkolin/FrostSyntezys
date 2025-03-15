import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';

const { Option } = Select;

const UserForm = ({ onSave, onCancel }) => {
  const { control, handleSubmit } = useForm();

  // Функция для отправки данных формы
  const onSubmit = (data) => {
    onSave(data); // Передаем данные в родительский компонент
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      {/* Поле "Имя" */}
      <Form.Item label="Имя">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Это поле обязательно' }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      {/* Поле "Email" */}
      <Form.Item label="Email">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Это поле обязательно', pattern: /^\S+@\S+$/i }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      {/* Поле "Роль" */}
      <Form.Item label="Роль">
        <Controller
          name="role"
          control={control}
          defaultValue="user"
          render={({ field }) => (
            <Select {...field}>
              <Option value="admin">Администратор</Option>
              <Option value="user">Пользователь</Option>
            </Select>
          )}
        />
      </Form.Item>

      {/* Кнопки */}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Сохранить
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;