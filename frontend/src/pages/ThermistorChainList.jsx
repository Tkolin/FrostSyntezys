import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, InputNumber, Table, Card, Descriptions, Space } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

function ThermistorChainList() {
  const [chains, setChains] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editingChain, setEditingChain] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const response = await axios.get('http://192.168.0.11:8000/api/thermistor-chains');
        setChains(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке оборудования:', error);
      }
    };

    fetchChains();
  }, []);

  const handleEdit = (chain) => {
    setEditingChain(chain);
    form.setFieldsValue(chain);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Удаление локации',
      content: 'Вы уверены, что хотите удалить эту локацию?',
      onOk: async () => {
        try {
          await axios.delete(`http://192.168.0.11:8000/api/thermistor-chains/${id}`);
          setChains(chains.filter(chain => chain.id !== id));
          console.log('Локация успешно удалена');
        } catch (error) {
          console.error('Ошибка при удалении локации:', error);
        }
      },
      onCancel: () => {
        console.log('Удаление отменено');
      },
    });
  };

  const handleSave = async (values) => {
    try {
      if (editingChain) {
        // Редактирование существующего оборудования
        await axios.put(`http://192.168.0.11:8000/api/thermistor-chains/${editingChain.id}`, values);
        setChains(chains.map(chain => (chain.id === editingChain.id ? { ...chain, ...values } : chain)));
      } else {
        // Создание нового оборудования
        const response = await axios.post('http://192.168.0.11:8000/api/thermistor-chains', values);
        setChains([...chains, response.data]); // Добавляем новое оборудование в список
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка при сохранении оборудования:', error);
    }
  };

  const handleDetail = (chain) => {
    setSelectedChain(chain);
    setIsDetailModalVisible(true);
  };

  const columns = [
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<InfoCircleOutlined />} onClick={() => handleDetail(record)} />
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
        <Table dataSource={chains} columns={columns} rowKey="id" />

        <Modal
          title={editingChain ? 'Редактирование оборудования' : 'Создание оборудования'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSave} layout="vertical">
            <Form.Item label="Модель" name="model" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Номер" name="number">
              <Input />
            </Form.Item>
            <Form.Item label="Наименование" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Количество точек" name="point_count">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Шаг точек" name="point_step">
              <InputNumber step={0.1} />
            </Form.Item>
            <Form.Item label="Диапазон измерений" name="measurement_range">
              <Input />
            </Form.Item>
            <Form.Item label="Погрешность измерений" name="error_margin">
              <Input />
            </Form.Item>
            <Form.Item label="Дискретность измерений" name="measurement_discreteness">
              <Input />
            </Form.Item>
            <Form.Item label="Количество сенсоров" name="sensor_count">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Расстояние между сенсорами" name="sensor_distance">
              <InputNumber step={0.1} />
            </Form.Item>
            <Form.Item label="Внешние интерфейсы" name="external_interfaces">
              <Input />
            </Form.Item>
            <Form.Item label="Доп. интерфейсы" name="additional_interfaces">
              <Input />
            </Form.Item>
            <Form.Item label="Тип памяти" name="memory_type">
              <Input />
            </Form.Item>
            <Form.Item label="Тип антенны" name="antenna_type">
              <Input />
            </Form.Item>
            <Form.Item label="Тип батареи" name="battery_type">
              <Input />
            </Form.Item>
            <Form.Item label="Количество батарей" name="battery_count">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Габариты" name="dimensions">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Подробная информация"
          visible={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={null}
        >
          {selectedChain && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Модель">{selectedChain.model}</Descriptions.Item>
              <Descriptions.Item label="Номер">{selectedChain.number}</Descriptions.Item>
              <Descriptions.Item label="Наименование">{selectedChain.name}</Descriptions.Item>
              <Descriptions.Item label="Количество точек">{selectedChain.point_count}</Descriptions.Item>
              <Descriptions.Item label="Шаг точек">{selectedChain.point_step}</Descriptions.Item>
              <Descriptions.Item label="Диапазон измерений">{selectedChain.measurement_range}</Descriptions.Item>
              <Descriptions.Item label="Погрешность измерений">{selectedChain.error_margin}</Descriptions.Item>
              <Descriptions.Item label="Дискретность измерений">{selectedChain.measurement_discreteness}</Descriptions.Item>
              <Descriptions.Item label="Количество сенсоров">{selectedChain.sensor_count}</Descriptions.Item>
              <Descriptions.Item label="Расстояние между сенсорами">{selectedChain.sensor_distance}</Descriptions.Item>
              <Descriptions.Item label="Внешние интерфейсы">{selectedChain.external_interfaces}</Descriptions.Item>
              <Descriptions.Item label="Доп. интерфейсы">{selectedChain.additional_interfaces}</Descriptions.Item>
              <Descriptions.Item label="Тип памяти">{selectedChain.memory_type}</Descriptions.Item>
              <Descriptions.Item label="Тип антенны">{selectedChain.antenna_type}</Descriptions.Item>
              <Descriptions.Item label="Тип батареи">{selectedChain.battery_type}</Descriptions.Item>
              <Descriptions.Item label="Количество батарей">{selectedChain.battery_count}</Descriptions.Item>
              <Descriptions.Item label="Габариты">{selectedChain.dimensions}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  );
}

export default ThermistorChainList;