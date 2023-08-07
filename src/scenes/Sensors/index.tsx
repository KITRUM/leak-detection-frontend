import { TSensor } from "@/types";
import { useParams } from "react-router-dom";
import CardList from "@/components/CardList/CardList";
import { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";

const Sensors = () => {
  const [sensors, setSensors] = useState<TSensor[] | []>([]);
  const { templateId } = useParams<string>();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        if (templateId) {
          const sensorsData = await getSensorsForTemplate(+templateId);
          setSensors(sensorsData);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  if (!sensors) {
    return <div className="p-6">No sensors for this template</div>;
  }

  return <CardList baseSlug="/sensors/" cards={sensors} />;
};

export default Sensors;
