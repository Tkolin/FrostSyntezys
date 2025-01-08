import { ConfigProvider } from "antd";
import "./App.css";
import CustomLayout from "./layouts";
import Home from "./pages/Home";

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <Router>
        <CustomLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </CustomLayout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
