import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";
import SensorsCardsList from "@/components/SensorsCardsList/SensorsCardsList";
import { TSensor } from "@/types";

type TTemplateCard = {
  baseSlug: string;
  template: {
    id: number;
    name: string;
  };
};

const TemplateCard: React.FC<TTemplateCard> = ({ baseSlug, template }) => {
  const [sensors, setSensors] = useState<TSensor[] | []>([]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        if (template.id) {
          const sensorsData = await getSensorsForTemplate(+template.id);
          setSensors(sensorsData);
        }
      } catch (error) {}
    };
    fetchSensors();
  }, []);

  return sensors ? (
    <Link
      to={`${baseSlug}${template.id}`}
      key={template.id}
      className={
        "min-h-[256px] w-full flex flex-col gap-2 p-4 bg-white rounded-md text-primary-black shadow-card hover:scale-[1.05] duration-300"
      }
    >
      <h2 className="text-lg">template: {template.name}</h2>
      <SensorsCardsList sensors={sensors} />
    </Link>
  ) : (
    <Link
      to={`${baseSlug}${template.id}`}
      key={template.id}
      className={
        "min-h-[256px] w-full flex flex-col gap-2 p-4 bg-white rounded-md text-primary-black shadow-card hover:scale-[1.05] duration-300"
      }
    >
      <h2 className="text-lg">template: {template.name}</h2>
    </Link>
  );
};

export default TemplateCard;
