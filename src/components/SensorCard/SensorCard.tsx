import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TSensorEvent } from "@/types";

type TSensorCard = {
  baseSlug: string;
  sensor: {
    id: number;
    name: string;
  };
  backgroundColor?: string | null;
};
// TODO move
enum SENSOR_EVEN_COLOR {
  ok = "bg-green-500",
  critical = "bg-red-500",
}
// TODO move
const hostUrl = "ws://localhost:8000";

const SensorCard: React.FC<TSensorCard> = ({ baseSlug, sensor }) => {
  const [sensorCardColor, setSensorCardColor] = useState("");
  // eslint-disable-next-line no-console
  console.log("sensorCardColor", sensorCardColor);

  useEffect(() => {
    const socketSensorEvents = new WebSocket(
      `${hostUrl}/sensors/${sensor.id}/events`
    );

    socketSensorEvents.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { type } = response.result as TSensorEvent;
      // eslint-disable-next-line no-console
      console.log("Event received: ", type);
      setSensorCardColor(
        SENSOR_EVEN_COLOR[type as keyof typeof SENSOR_EVEN_COLOR]
      );
    };

    return () => {
      socketSensorEvents.close();
    };
  }, []);

  return (
    <Link
      to={`${baseSlug}${sensor.id}`}
      key={sensor.id}
      className={`min-h-[256px] w-full ${sensorCardColor} p-8 rounded-md text-lg text-primary-black shadow-card hover:scale-[1.05] duration-300`}
    >
      {sensor.name}
    </Link>
  );
};

export default SensorCard;
