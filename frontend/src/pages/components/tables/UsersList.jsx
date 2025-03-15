import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Card, Select, Space, Typography, Alert } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select; // Импортируем компонент Select
const { Title } = Typography; // Импортируем компонент Title

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.0.11:8000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Удаление пользователя',
      content: 'Вы уверены, что хотите удалить этого пользователя?',
      onOk: async () => {
        try {
          await axios.delete(`http://192.168.0.11:8000/api/users/${id}`);
          setUsers(users.filter(user => user.id !== id));
          console.log('Пользователь успешно удалён');
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
      },
      onCancel: () => {
        console.log('Удаление отменено');
      },
    });
  };

  const handleSave = async (values) => {
    try {
      if (editingUser) {
        // Редактирование существующего пользователя
        await axios.put(`http://192.168.0.11:8000/api/users/${editingUser.id}`, values);
        setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...values } : user)));
      } else {
        // Создание нового пользователя
        const response = await axios.post('http://192.168.0.11:8000/api/users', values);
        setUsers([...users, response.data]); // Добавляем нового пользователя в список
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      <Card style={{ width: '100%' }}>
        {/* Заголовок списка */}
        <Alert message="Список существующих термакос (моделей)" />

        {/* Кнопка "Создать запись" */}
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setEditingUser(null);
            form.resetFields();
          }}
          style={{
            backgroundColor: 'white', // Белый фон
            color: 'rgba(0, 0, 0, 0.85)', // Цвет текста (чёрный)
            border: '1px solid #d9d9d9', // Граница для визуального выделения
          }}
        >
          Создать запись
        </Button>

        {/* Таблица */}
        <Table dataSource={users} columns={columns} rowKey="id" />

        {/* Модальное окно для редактирования/создания */}
        <Modal
          title={editingUser ? 'Редактирование пользователя' : 'Создание пользователя'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSave} layout="vertical">
            <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Роль" name="role" rules={[{ required: true }]}>
              <Select placeholder="Выберите роль">
                <Option value="admin">Администратор</Option>
                <Option value="user">Пользователь</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default UsersList;