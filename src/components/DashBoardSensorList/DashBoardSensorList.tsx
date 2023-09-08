import { useEffect, useState } from "react";
import { TSensor } from "@/types";
import { getSensorsForTemplate } from "@/services/sensors";
import DashboardSensor from "@/components/DashboardSensor/DashboardSensor";

const DashBoardSensorList = () => {
  const [pinnedSensors, setPinnedSensors] = useState<TSensor[] | []>([]);

  useEffect(() => {
    // const fetchSensors = async () => {
    //   try {
    //     const sensorsData = await getPinnedSensors();
    //
    //     if (sensorsData) {
    //       setPinnedSensors(sensorsData);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching templates:", error);
    //   }
    // };
    //
    // fetchSensors();

    const fetchSensors = async () => {
      try {
        const sensorsData = await getSensorsForTemplate(1);

        if (sensorsData) {
          setPinnedSensors(sensorsData);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchSensors();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-2 p-8 gap-8">
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
