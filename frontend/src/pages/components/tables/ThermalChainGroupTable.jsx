import { LineChartOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import RegisterThermalChainInGroup from "../forms/RegisterThermalChainInGroupForm";

const ThermalChainGroupTable = ({
  selectedThermalKos,
  changeSelectedThermalKos,
}) => {
  const [modalEdit, setModalEdit] = useState(null);
  const [modalStatic, setModalStatic] = useState(null);

  const columns = [
    {
      title: "Номер",
      dataIndex: "number",
    },
    {
      title: "Объект (скважина)",
      dataIndex: "facility",
    },
    {
      title: "Дата изменения",
      dataIndex: "datetime_edit",
    },
    {
      title: "Действия",
      dataIndex: "activity",
      render: (_, record) => (
        <Space.Compact>
          <Button
            icon={<SettingOutlined />}
            type="link"
            onClick={() => setModalStatic(record.id)}
          ></Button>
          <Button
            type="link"
            icon={<LineChartOutlined />}
            onClick={() => setModalEdit(record.id)}
          ></Button>
        </Space.Compact>
      ),
    },
  ];
  const dataSource = Array.from({
    length: 46,
  }).map((_, i) => ({
    key: i + 1,
    id: i + 1,
    number: `saaew ${i + 1}`,
    facility: `обьект ${i + 1}`,
    datetime_edit: dayjs().toString(),
    activity: `+`,
  }));
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    selectedThermalKos || []
  );
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    changeSelectedThermalKos && changeSelectedThermalKos(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   Table.SELECTION_NONE,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: (changeableRowKeys) => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: (changeableRowKeys) => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
    ],
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={2} style={{ marginTop: 0 }}>
        Выбор теромокосы/группы
      </Typography.Title>
      <Table
        size={"small"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    
      <Modal
        open={modalEdit}
        onClose={() => setModalEdit(null)}
        onCancel={() => setModalEdit(null)}
        title={"Регистрация термокосы"}
      >
        <RegisterThermalChainInGroup id={modalEdit} />
      </Modal>
      <Modal
        open={modalStatic}
        onClose={() => setModalStatic(null)}
        onCancel={() => setModalStatic(null)}
        title={"Подробная статистика по термокосе"}
      >
        <RegisterThermalChainInGroup id={modalStatic} />
      </Modal>
    </Space>
  );
};
export default ThermalChainGroupTable;
