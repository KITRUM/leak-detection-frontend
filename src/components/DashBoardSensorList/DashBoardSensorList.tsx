import { useEffect, useState } from "react";
import { TSensor } from "@/types";
import { getPinnedSensors } from "@/services/sensors";
import DashboardSensor from "@/components/DashboardSensor/DashboardSensor";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

const DashBoardSensorList = () => {
  const [pinnedSensors, setPinnedSensors] = useState<TSensor[] | []>([]);

  useEffect(() => {
    const fetchSensors = async () => {
      const sensorsData = await getPinnedSensors();

      if (sensorsData) {
        setPinnedSensors(sensorsData);
      }
    };

    fetchSensors();
  }, []);

  return (
    <>
      {pinnedSensors.length === 0 ? (
        <EmptySceneMessage message="No sensors are pinned or loaded" />
      ) : (
        <section className="w-full h-full grid grid-cols-2 p-2 gap-8">
          {pinnedSensors.map((sensor) => {
            return (
              <DashboardSensor
                sensorName={sensor.name}
                sensorId={sensor.id}
                key={sensor.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default DashBoardSensorList;
