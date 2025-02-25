import {
  Button,
  Form,
  Select
} from 'antd';
import React from 'react';

const RegisterThermalChainInGroup = ({defaultValue}) => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);
  return (
    <Form
      form={form}
      defaultValue={defaultValue || null}
      layout="vertical"
      style={{
        maxWidth: 600,
      }}
    >

      <Form.Item
        label="Термокоса (модель)"
        name="thermal_chain"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Select   options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}/>
      </Form.Item>
       <Form.Item
        label="Объект (скважина)"
        name="facility"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Select   options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}/>
      </Form.Item>
      {/*<Form.List name="users">
       {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'first']}
                rules={[
                  {
                    required: true,
                    message: 'Missing first name',
                  },
                ]}
              >
                <InputNumber placeholder="Глубина" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'last']}
                rules={[
                  {
                    required: true,
                    message: 'Missing last name',
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Зарегистрировать датчик
            </Button>
          </Form.Item>
        </>
      )} 
    </Form.List>*/}
      <Form.Item
        wrRegisterThermalChainInGrouperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterThermalChainInGroup;