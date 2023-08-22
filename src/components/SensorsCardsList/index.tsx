import Card from "@/elements/Card";
import { TSensorEvent } from "@/types";
import React from "react";

type TCardList = {
  baseSlug: string;
  sensors: {
    id: number;
    name: string;
  }[];
  events: Record<number, TSensorEvent>;
};

const EVENT_TYPE_TO_COLOR_MAPPING: Record<string, string> = {
  ok: "green",
  critical: "red",
};

const CardList: React.FC<TCardList> = ({ baseSlug, sensors, events }) => {
  console.log(events);
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {sensors.map((sensor) => {
        return (
          <Card
            key={sensor.id}
            card={sensor}
            baseSlug={baseSlug}
            backgroundColor={
              events[sensor.id]
                ? EVENT_TYPE_TO_COLOR_MAPPING[events[sensor.id].type]
                : null
            }
          />
        );
      })}
    </div>
  );
};

export default CardList;
