import React from "react";
import SensorCard from "@/components/SensorCard/SensorCard";

type TSensorsCardsList = {
  baseSlug?: string;
  sensors: {
    id: number;
    name: string;
  }[];
};

// We use SensorsCardsList in template if we have no baseSlug prop

const SensorsCardsList: React.FC<TSensorsCardsList> = ({
  baseSlug,
  sensors,
}) => {
  const columnsNumber = baseSlug ? "grid-cols-4" : "grid-cols-2";
  const padding = baseSlug ? "p-8" : "p-1";
  const gap = baseSlug ? "gap-8" : "gap-1";

  return (
    <div
      className={`grid ${columnsNumber} place-items-center ${gap} ${padding}`}
    >
      {sensors.map((sensor) => {
        return (
          <SensorCard key={sensor.id} sensor={sensor} baseSlug={baseSlug} />
        );
      })}
    </div>
  );
};

export default SensorsCardsList;
