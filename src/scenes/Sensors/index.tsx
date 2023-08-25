import { TSensor } from "@/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";
import SensorsCardsList from "@/components/SensorsCardsList/SensorsCardsList";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const Sensors = () => {
  const [sensors, setSensors] = useState<TSensor[] | []>([]);
  const { templateId } = useParams<string>();

  // TODO: Change to the uniform sensor ID

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        if (templateId) {
          const sensorsData = await getSensorsForTemplate(+templateId);
          setSensors(sensorsData);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchSensors();
  }, []);

  if (!sensors) {
    return <div className="p-6">No sensors for this template</div>;
  }

  return <SensorsCardsList baseSlug="/sensors/" sensors={sensors} />;
};

export default Sensors;
