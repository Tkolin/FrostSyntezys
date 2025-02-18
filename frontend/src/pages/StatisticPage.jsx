import { Alert, Button, Card, Modal, Typography } from "antd";
import { useState } from "react";
import RegisterThermalKosaInGroup from "./components/RegisterThermalKosaInGroup";
import ThermalKosaGroupTable from "./components/ThermalKosaGroupTable";
import ThermalKosaTable from "./components/ThermalKosaTable";

const StatisticPage = () => {
  const [thermalKosaGroupSelected, setThermalKosaGroupSelected] = useState([]);
  const [modalAddThermalKosa, setModalAddThermalKosa] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        gap: "5px",
        display: "flex",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Alert message="Список термакос"></Alert>

        <ThermalKosaGroupTable
          changeSelectedThermalKos={setThermalKosaGroupSelected}
        />
        <Button
          style={{ width: "100%" }}
          onClick={() => setModalAddThermalKosa(true)}
        >
          +
        </Button>
        <Modal
          open={modalAddThermalKosa}
          onClose={() => setModalAddThermalKosa(false)}
          onCancel={() => setModalAddThermalKosa(false)}
          title={"Регистрация термокосы"}
        >
          <RegisterThermalKosaInGroup />
        </Modal>
        {thermalKosaGroupSelected}
      </Card>

      <div style={{ width: "100%" }}>
        <Card style={{ width: "100%" }}>
          <Alert message="Настройка отображения датчиков"></Alert>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            Настройки отображения
          </Typography.Title>
          {/* <Calendar fullscreen={false} /> */}
        </Card>
        {thermalKosaGroupSelected?.map((row) => (
          <Card style={{ width: "100%" }}>
            <Alert message={"Замеры по термокосе " + row}></Alert>
            <ThermalKosaTable thermalKosaId={row} />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default StatisticPage;
