import { LineChartOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ThermalChainForm from "../forms/ThermalChainForm";
 
const ThermalChainTable = () => {
  const [modalEdit, setModalEdit] = useState(null);
  const [modalStatic, setModalStatic] = useState(null);

  const columns = [
    {
      title: "Номер",
      dataIndex: "number",
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
            type="link"
            icon={< SettingOutlined/>}
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
    datetime_edit: dayjs().toString(),
    activity: `+`,
  }));

  
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table
        size={"small"}
        columns={columns}
        dataSource={dataSource}
      />
        <Modal
          open={modalEdit}
          onClose={() => setModalEdit(null)}
          onCancel={() => setModalEdit(null)}
          title={"Управление термокосой"}
        >
        <ThermalChainForm id={modalEdit} />
      </Modal>
    </Space>
  );
};
export default ThermalChainTable;
