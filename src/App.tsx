import { Route, Routes } from "react-router-dom";
import SideNavigation from "@/scenes/SideNavigation";
import Dashboard from "@/scenes/Dashboard";
import About from "@/scenes/About";
import Templates from "@/scenes/Templates";
import Platforms from "@/scenes/Platforms";
import Sensors from "@/scenes/Sensors";
import Sensor from "@/components/Sensor/Sensor";
import CreateTemplate from "@/scenes/CreateTemplate";

export default function App() {
  return (
    <div className="flex min-h-screen bg-app-bg">
      <div className="fixed top-0 left-0 w-64 h-full bg-primary-black">
        <SideNavigation />
      </div>
      <div className="overflow-y-auto ml-64 w-full">
        <Routes>
          <Route element={<Dashboard />} path="/" index={true} />
          <Route element={<Platforms />} path="/platforms" />
          <Route element={<Templates />} path="/platforms/:platformId" />
          <Route element={<Sensors />} path="/templates/:templateId" />
          <Route element={<Sensor />} path="/sensors/:sensorId" />
          <Route element={<About />} path="/about" />
          <Route
            element={<CreateTemplate />}
            path="platforms/:platformId/create-template"
          />
        </Routes>
      </div>
    </div>
  );
}
