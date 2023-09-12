import { useEffect, useState } from "react";
import { TSensor } from "@/types";
import { getPinnedSensors } from "@/services/sensors";
import DashboardSensor from "@/components/DashboardSensor/DashboardSensor";

const DashBoardSensorList = () => {
  const [pinnedSensors, setPinnedSensors] = useState<TSensor[] | []>([]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const sensorsData = await getPinnedSensors();

        if (sensorsData) {
          setPinnedSensors(sensorsData);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchSensors();
  }, []);

  if (pinnedSensors.length === 0) {
    return (
      <div className="flex justify-between min-h-[58px] py-2 px-4">
        <h1 className="text-xl leading-4 text-text-gray-300 pt-5">
          No sensors are pinned yet
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-2 p-2 gap-8">
      {pinnedSensors.map((sensor) => {
        return (
          <DashboardSensor
            sensorName={sensor.name}
            sensorId={sensor.id}
            key={sensor.id}
          />
        );
      })}
    </div>
  );
};

export default DashBoardSensorList;
