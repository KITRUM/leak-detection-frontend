import { TSensor } from "@/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";
import SensorsCardsList from "@/components/SensorsCardsList/SensorsCardsList";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LinkButton from "@/elements/LinkButton/LinkButton";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

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

          if (sensorsData) {
            setSensors(sensorsData);
          }
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchSensors();
  }, []);

  return (
    <>
      <div className="flex justify-end py-2 px-4">
        <LinkButton
          name="Create sensor"
          slug={`/templates/${templateId}/create-sensor`}
        />
      </div>
      {!sensors && <EmptySceneMessage message="No sensors for this template" />}
      {sensors && <SensorsCardsList baseSlug="/sensors/" sensors={sensors} />}
    </>
  );
};

export default Sensors;
