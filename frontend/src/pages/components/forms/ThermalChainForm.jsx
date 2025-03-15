import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Spin,
  notification,
} from 'antd';
import React from 'react';
import {
  CREATE_THERMISTOR_CHAIN,
  GET_THERMISTOR_CHAIN,
  UPDATE_THERMISTOR_CHAIN,
} from '../../../gql/thermistorChain';

const { Option } = Select;

const ThermalChainForm = ({ id, onSuccess, ...props }) => {
  const [form] = Form.useForm();

  // Функция для отображения уведомлений
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  // Если id передан, загружаем данные для редактирования
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_THERMISTOR_CHAIN, {
    variables: { id },
    skip: !id, // Не выполняем запрос, если id не передан (создание новой записи)
    onCompleted: (resultData) => {
      if (resultData && resultData.ThermistorChain) {
        form.setFieldsValue(resultData.ThermistorChain);
      }
    },
    onError: (error) => {
      openNotification('error', 'Ошибка загрузки', error.message);
    },
  });

  // Мутация для создания новой записи
  const [createThermistorChain, { loading: createLoading }] = useMutation(
    CREATE_THERMISTOR_CHAIN,
    {
      onCompleted: (resultData) => {
        openNotification('success', 'Успешно', 'Термисторная цепь создана');
        form.resetFields(); // Очищаем форму
        if (onSuccess) onSuccess(); // Закрываем модальное окно
      },
      onError: (error) => {
        openNotification('error', 'Ошибка создания', error.message);
      },
    }
  );

  // Мутация для обновления существующей записи
  const [updateThermistorChain, { loading: updateLoading }] = useMutation(
    UPDATE_THERMISTOR_CHAIN,
    {
      onCompleted: (resultData) => {
        openNotification('success', 'Успешно', 'Термисторная цепь обновлена');
        if (onSuccess) onSuccess(); // Закрываем модальное окно
      },
      onError: (error) => {
        openNotification('error', 'Ошибка обновления', error.message);
      },
    }
  );

  // Обработчик отправки формы
  const onFinish = (values) => {
    console.log('Значения формы:', values);
    if (!id) {
      createThermistorChain({ variables: { ...values } });
    } else {
      updateThermistorChain({ variables: { id, ...values } });
    }
  };

  // Отображаем спиннер, если данные загружаются
  if (queryLoading) return <Spin />;

  return (
    <Form
      form={form}
      layout='horizontal'
      onFinish={onFinish}
      size='small'
      initialValues={{ measurement_range: 37 }}
    >
      {/* Поле "Модель" */}
      <Form.Item
        label='Модель'
        name='model'
        rules={[{ required: true, message: 'Пожалуйста, введите модель!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Номер' name='number'>
        <Input />
      </Form.Item>

      <Form.Item
        label='Наименование'
        name='name'
        rules={[{ required: true, message: 'Введите наименование!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Диапазон измерений'
        name='measurement_range'
        rules={[{ required: true, message: 'Выберите диапазон измерений!' }]}
      >
        <Slider min={0} max={100} marks={{ 0: '0°C', 100: '100°C' }} />
      </Form.Item>

      <Form.Item
        label='Погрешность измерений'
        name='error_margin'
        rules={[
          { required: true, message: 'Введите погрешность!' },
          {
            type: 'number',
            min: 0,
            message: 'Значение должно быть неотрицательным!'
          }
        ]}
      >
        <InputNumber step={0.01} />
      </Form.Item>

      <Form.Item
        label='Дискретность измерений'
        name='measurement_discreteness'
        rules={[
          { required: true, message: 'Введите дискретность измерений!' },
          {
            type: 'number',
            min: 0,
            message: 'Значение должно быть положительным!'
          }
        ]}
      >
        <InputNumber step={0.01} />
      </Form.Item>

      <Form.Item
        label='Количество сенсоров'
        name='sensor_count'
        rules={[
          { required: true, message: 'Введите количество сенсоров!' },
          { type: 'number', min: 1, message: 'Минимальное значение 1!' }
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label='Расстояние между сенсорами'
        name='sensor_distance'
        rules={[
          { required: true, message: 'Введите расстояние между сенсорами!' },
          { type: 'number', min: 0.1, message: 'Минимальное значение 0.1!' }
        ]}
      >
        <InputNumber step={0.1} />
      </Form.Item>

      <Form.Item
        label='Внешние интерфейсы'
        name='external_interfaces'
        rules={[{ required: true, message: 'Введите внешние интерфейсы!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Доп. интерфейсы' name='additional_interfaces'>
        <Input />
      </Form.Item>

      <Form.Item
        label='Тип памяти'
        name='memory_type'
        rules={[{ required: true, message: 'Введите тип памяти!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Тип антенны'
        name='antenna_type'
        rules={[{ required: true, message: 'Введите тип антенны!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Тип батареи'
        name='battery_type'
        rules={[{ required: true, message: 'Введите тип батареи!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Количество батарей'
        name='battery_count'
        rules={[
          { required: true, message: 'Введите количество батарей!' },
          { type: 'number', min: 1, message: 'Минимальное значение 1!' }
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label='Габариты'
        name='dimensions'
        rules={[{ required: true, message: 'Введите габариты!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          loading={createLoading || updateLoading}
        >
          {id ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ThermalChainForm;