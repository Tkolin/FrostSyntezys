import { Alert, Card } from "antd";
import RequestTable from "./components/tables/RequestTable";

const JournalPage = () => {
  return (
    <div  style={{
        height: "100%",
        display: "flex",
      }}>
      <Card
            style={{   width: "100%" }}
          >
        <Alert message="Журнал событий"></Alert>
        <RequestTable  style={{ width: "100%" }}></RequestTable>
      </Card>
    </div>
  );
};
export default JournalPage;
