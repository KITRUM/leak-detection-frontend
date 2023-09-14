import { Route, Routes } from "react-router-dom";
import SideNavigation from "@/scenes/SideNavigation";
import Dashboard from "@/scenes/Dashboard";
import About from "@/scenes/About";
import Templates from "./scenes/Templates";
import Platforms from "@/scenes/Platforms";
import Sensors from "@/scenes/Sensors";
import Sensor from "@/components/Sensor/Sensor";
import CreateTemplate from "@/scenes/CreateTemplate";
import CreateSensor from "@/scenes/CreateSensor";
import { INFRASTRUCTURE } from "@/constants/infrastructure";

export default function App() {
  return (
    <div className="flex min-h-screen bg-app-bg">
      <div className="fixed top-0 left-0 w-64 h-full bg-primary-black">
        <SideNavigation />
      </div>
      <div className="overflow-y-auto ml-64 w-full">
        <Routes>
          <Route
            element={<Dashboard />}
            path={INFRASTRUCTURE.HOME}
            index={true}
          />
          <Route element={<Platforms />} path={INFRASTRUCTURE.PLATFORMS} />
          <Route element={<Templates />} path={INFRASTRUCTURE.TEMPLATES} />
          <Route
            element={<CreateTemplate />}
            path={INFRASTRUCTURE.CREATE_TEMPLATE}
          />
          <Route element={<Sensors />} path={INFRASTRUCTURE.SENSORS_LIST} />
          <Route element={<Sensor />} path={INFRASTRUCTURE.SENSOR} />
          <Route
            element={<CreateSensor />}
            path={INFRASTRUCTURE.CREATE_SENSOR}
          />
          <Route element={<About />} path={INFRASTRUCTURE.ABOUT} />
        </Routes>
      </div>
    </div>
  );
}
