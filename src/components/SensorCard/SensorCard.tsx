import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TSensor, TSensorEvent } from "@/types";
import { connectSensorEvents } from "@/services/sensor";
import Pin from "@/elements/Pin/Pin";
import { sensorTogglePin } from "@/services/sensors";
import Spinner from "@/elements/Spinner/Spinner";

type TSensorCard = {
  baseSlug?: string;
  sensor: TSensor;
};
// TODO move
enum SENSOR_EVENT_COLOR {
  ok = "bg-green-500",
  critical = "bg-red-500",
}

// We use SensorsCardsList in template if we have no baseSlug prop

const SensorCard: React.FC<TSensorCard> = ({ baseSlug, sensor }) => {
  const [sensorCardColor, setSensorCardColor] = useState("");
  const [isSensorPinned, setIsSensorPinned] = useState(
    sensor.configuration.pinned
  );
  const [isPinLoading, setIsPinLoading] = useState(false);

  useEffect(() => {
    const socketSensorEvents = connectSensorEvents(sensor.id);

    socketSensorEvents.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { type } = response.result as TSensorEvent;
      setSensorCardColor(
        SENSOR_EVENT_COLOR[type as keyof typeof SENSOR_EVENT_COLOR]
      );
    };

    return () => {
      socketSensorEvents.close();
    };
  }, []);

  const handlePinClick = async () => {
    setIsPinLoading(true);

    const sensorPinnedStatus = await sensorTogglePin(sensor.id);

    if (typeof sensorPinnedStatus === "boolean") {
      setIsSensorPinned(sensorPinnedStatus);
    }

    setIsPinLoading(false);
  };

  if (baseSlug) {
    return (
      <div
        className={`min-h-[256px] w-full ${sensorCardColor} p-2 rounded-md text-lg text-primary-black shadow-card`}
      >
        <div className="flex justify-end" onClick={handlePinClick}>
          {isPinLoading ? <Spinner /> : <Pin isPinned={isSensorPinned} />}
        </div>
        <Link to={`${baseSlug}${sensor.id}`} className="block h-full">
          <h2 className="mx-4 block text-md text-text-gray border-b border-text-outline hover:scale-[1.05] duration-300">
            {sensor.name}
          </h2>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-items-center items-center min-h-[88px] w-full ${sensorCardColor} p-1 rounded-md text-xs text-primary-black border border-border-gray`}
    >
      <div className="w-full text-center">{sensor.name}</div>
    </div>
  );
};

export default SensorCard;
