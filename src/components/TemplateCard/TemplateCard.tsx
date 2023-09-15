import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";
import SensorsCardsList from "@/components/SensorsCardsList/SensorsCardsList";
import { TSensor } from "@/types";
import { Maybe } from "yup";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

type TTemplateCard = {
  baseSlug: string;
  template: {
    id: number;
    name: string;
  };
};

const TemplateCard: React.FC<TTemplateCard> = ({ baseSlug, template }) => {
  const [sensors, setSensors] = useState<TSensor[] | []>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSensors = async () => {
      if (template.id) {
        const sensorsData: Maybe<TSensor[]> = await getSensorsForTemplate(
          +template.id
        );
        if (sensorsData) {
          setSensors(sensorsData);
        }
      }
      setIsLoading(false);
    };
    fetchSensors();
  }, []);

  return (
    <Link
      to={`${baseSlug}${template.id}`}
      key={template.id}
      className={
        "min-h-[274px] w-full h-full flex flex-col gap-2 p-6 bg-white rounded-md shadow-card hover:scale-[1.05] duration-300"
      }
    >
      <h2 className="block text-md text-text-gray border-b border-text-outline">
        {template.name}
      </h2>
      {sensors.length === 0 ? (
        !loading && <EmptySceneMessage message="No sensors are loaded" />
      ) : (
        <SensorsCardsList sensors={sensors} />
      )}
    </Link>
  );
};

export default TemplateCard;
