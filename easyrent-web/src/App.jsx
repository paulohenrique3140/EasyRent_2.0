import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./components/Home";
import ClientManagement from "./components/ClientManagement";
import VehicleManagement from "./components/VehicleManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clients" element={<ClientManagement />} />
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
