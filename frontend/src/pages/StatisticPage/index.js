import ThermalKosaGroupTable from "./components/ThermalKosaGroupTable";
import ThermalKosaTable from "./components/ThermalKosaTable";

const index = () => {
  return (
    <div style={{ display: "flex", height: "100%", gap: "5px" }}>
      <div style={{ width: "100%" }}>
        <ThermalKosaGroupTable />
      </div>

      <div style={{ width: "100%" }}>
        <ThermalKosaTable />
      </div>
    </div>
  );
};
export default index;
