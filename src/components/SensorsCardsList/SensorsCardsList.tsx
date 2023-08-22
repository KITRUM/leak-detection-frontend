import React from "react";
import SensorCard from "@/components/SensorCard/SensorCard";

type TSensorsCardsList = {
  baseSlug: string;
  sensors: {
    id: number;
    name: string;
  }[];
};

const SensorsCardsList: React.FC<TSensorsCardsList> = ({
  baseSlug,
  sensors,
}) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {sensors.map((sensor) => {
        return (
          <SensorCard key={sensor.id} sensor={sensor} baseSlug={baseSlug} />
        );
      })}
    </div>
  );
};

export default SensorsCardsList;
