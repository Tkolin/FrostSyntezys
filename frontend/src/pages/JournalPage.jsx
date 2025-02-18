import { Alert, Card } from "antd";
import RequestTable from "./components/RequestTable";

const JournalPage = () => {
  return (
    <Card
      style={{ display: "flex", height: "100%", gap: "5px", width: "100%" }}
    >
      <Alert message="Журнал событий"></Alert>
      <RequestTable  ></RequestTable>
    </Card>
  );
};
export default JournalPage;
