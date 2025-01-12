import { Button, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
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
  },
];
const dataSource = Array.from({
  length: 46,
}).map((_, i) => ({
  key: i,
  number: `saaew ${i}`,
  datetime_edit: dayjs(),
  activity: `+`,
}));
const ThermalKosaGroupTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
    <Space direction="vertical">
      <Typography.Title level={2}>SfafsfaS</Typography.Title>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />

      <Button style={{ width: "100%" }}>+</Button>
    </Space>
  );
};
export default ThermalKosaGroupTable;
