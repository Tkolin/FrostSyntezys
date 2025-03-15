import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, gql } from '@apollo/client';

// GraphQL-запрос для получения локаций
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      x
      y
    }
  }
`;

// GraphQL-мутация для обновления локации
const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: ID!, $name: String!, $x: Float!, $y: Float!) {
    updateLocation(id: $id, name: $name, x: $x, y: $y) {
      id
      name
      x
      y
    }
  }
`;

// GraphQL-мутация для удаления локации
const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`;

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_LOCATIONS);
  const [updateLocation] = useMutation(UPDATE_LOCATION);
  const [deleteLocation] = useMutation(DELETE_LOCATION);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: null, name: '', x: '', y: '' });

  useEffect(() => {
    if (data) {
      setLocations(data.locations);
    }
  }, [data]);

  // Функция для открытия модального окна редактирования
  const handleEdit = (record) => {
    setEditData({
      id: record.id,
      name: record.name,
      x: record.x,
      y: record.y
    });
    setIsModalOpen(true);
  };

  // Функция для сохранения изменений
  const handleSave = () => {
    updateLocation({
      variables: {
        id: editData.id,
        name: editData.name,
        x: parseFloat(editData.x),
        y: parseFloat(editData.y),
      },
    })
      .then(() => {
        message.success('Локация успешно обновлена');
        refetch();
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Ошибка при обновлении:', error);
        message.error('Ошибка при обновлении');
      });
  };

  // Функция удаления
  const handleDelete = (id) => {
    console.log('ID перед отправкой:', id);
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        console.error("Ошибка: ID не является числом", id);
        message.error("Ошибка удаления: некорректный ID");
        return;
    }

    Modal.confirm({
      title: 'Удаление локации',
      content: 'Вы уверены, что хотите удалить эту локацию?',
      onOk: () => {
        deleteLocation({
          variables: { id: id.toString() }, // Передаем id как строку
          refetchQueries: [{ query: GET_LOCATIONS }],
        })
          .then(({ data }) => {
            if (data.deleteLocation === true) {
              message.success('Локация успешно удалена');
              setLocations(locations.filter(location => location.id !== parsedId));
            } else {
              message.error('Ошибка: локация не была удалена');
            }
          })
          .catch(error => {
            console.error('Ошибка при удалении:', error);
            message.error('Ошибка при удалении');
          });
      }
    });
  };

  // Колонки таблицы
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Координата X',
      dataIndex: 'x',
      key: 'x',
    },
    {
      title: 'Координата Y',
      dataIndex: 'y',
      key: 'y',
    },
    {
      title: 'Действия',
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
    <>
      <Table
        dataSource={locations}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Модальное окно редактирования */}
      <Modal
        title="Редактирование локации"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <label>Наименование</label>
        <Input
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />

        <label>Координата X</label>
        <Input
          type="number"
          value={editData.x}
          onChange={(e) => setEditData({ ...editData, x: e.target.value })}
        />

        <label>Координата Y</label>
        <Input
          type="number"
          value={editData.y}
          onChange={(e) => setEditData({ ...editData, y: e.target.value })}
        />
      </Modal>
    </>
  );
};

export default LocationTable;