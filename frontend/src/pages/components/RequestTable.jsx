import { CloseCircleFilled } from "@ant-design/icons";
import { Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

// Функция генерации данных для таблицы
const generateData = (numRows = 50) => {
  const data = [];
  const performers = ["Сидоров И.А.", "Иванов П.П.", "Петров С.С."];
  for (let i = 1; i <= numRows; i++) {
    // Генерируем случайную дату начала в пределах последних 10 дней
    const startDate = dayjs().subtract(Math.floor(Math.random() * 10), 'day');
    // Дата окончания – через 1-5 дней после даты начала
    const endDate = startDate.add(Math.floor(Math.random() * 5) + 1, 'day');
    data.push({
      key: i.toString(),
      threat: Math.ceil(Math.random() * 10) > 5,
      state: "Активна",
      object: `Объект ${i}`,
      device: `TC-${Math.ceil(Math.random() * 10)}/${Math.ceil(Math.random() * 10)}`,
      description: `Описание ${i}`,
      startTime: startDate.format("DD-MM-YY"),
      endTime: endDate.format("DD-MM-YY"),
      performer: performers[Math.floor(Math.random() * performers.length)],
    });
  }
  return data;
};

// Определяем столбцы таблицы с уникальными dataIndex
const columns = [
  {
    title: "Угроза",
    dataIndex: "threat",
    key: "threat",
    render: (text) => (
      <div>
        {
          text ?
               ( <Space.Compact  >
        <Typography.Text ><CloseCircleFilled style={{color: "red"}}/> Авария</Typography.Text>
          </Space.Compact>)
          : 
              (<Space.Compact>
                <Typography.Text ><CloseCircleFilled style={{color: "rgba(255, 206, 32, 1)"}}/> Предупреждение</Typography.Text>

      </Space.Compact>)
          }

      </div>

    ),
  },
  {
    title: "Состояние",
    dataIndex: "state",
    key: "state",
    render: (text) => <Typography.Text danger>{text}</Typography.Text>,
  },
  {
    title: "Объект",
    dataIndex: "object",
    key: "object",
  },
  {
    title: "Устройство",
    dataIndex: "device",
    key: "device",
    render: (text) => <Typography.Link>{text}</Typography.Link>,
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
    render: (text) => <Typography.Link>{text}</Typography.Link>,
  },
  {
    title: "Время начала",
    dataIndex: "startTime",
    key: "startTime",
    render: (text) => <Typography.Link>{text}</Typography.Link>,
  },
  {
    title: "Время окончания",
    dataIndex: "endTime",
    key: "endTime",
    render: (text) => <Typography.Link>{text}</Typography.Link>,
  },
  {
    title: "Исполнитель",
    dataIndex: "performer",
    key: "performer",
    render: (text) => <Typography.Link>{text}</Typography.Link>,
  },
];

// Компонент таблицы, в котором данные автогенерируются при рендеринге
const RequestTable = () => {
  const data = generateData(50); // Автогенерация 10 строк данных
  return (
    <Space style={{ width: "100%" }}>
      <Table columns={columns} dataSource={data} style={{ width: "100%" }} />
    </Space>
  );
};

export default RequestTable;
