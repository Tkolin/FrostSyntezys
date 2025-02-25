import { Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const MeteringThermalChainTable = ({
  dateEnd = dayjs(),
  dateStart = dayjs().subtract(7, "day"),
  data = [],
}) => {
  const columns = [
    {
      title: "№ ТС",
      dataIndex: "number",
    },
    {
      title: "Глубина ТС, м",
      dataIndex: "deep",
    },
  ];

  // Итерируем от dateStart до dateEnd (включительно) и добавляем колонку для каждого дня
  let currentDate = dayjs(dateStart);
  let dynamicDates = [];
  while (currentDate.isSameOrBefore(dateEnd, "day")) {
    dynamicDates.push(currentDate.format("YYYY-MM-DD"));

    columns.push({
      title: currentDate.format("DD.MM.YY"), // формат отображения заголовка
      dataIndex: currentDate.format("YYYY-MM-DD"), // ключ данных, по которому потом можно сопоставлять данные
    });
    currentDate = currentDate.add(1, "day");
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const dataSource = Array.from({ length: 46 }).map((_, i) => {
    // Базовая информация
    const row = {
      key: i,
      number: `saaew ${i}`,
      deep: (Math.random() * 10).toFixed(2), // случайная глубина
      datetime_edit: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      activity: "+",
    };

    // Для каждой даты добавляем поле с динамическим значением (например, случайно "+" или "–")
    dynamicDates.forEach((dateKey) => {
      row[dateKey] = "-" + (Math.random() * 10).toFixed(1);
    });

    return row;
  });
  return (
    <Table
      size="small"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
export default MeteringThermalChainTable;
