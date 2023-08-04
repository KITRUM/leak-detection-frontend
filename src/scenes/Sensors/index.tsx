import { fetchSensors } from "@/services/sensors";
import { Sensor as ISensor } from "@/types";
import { useParams } from "react-router-dom";
import CardList from "@/components/CardList/CardList";

const Sensors = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const sensors: ISensor[] = fetchSensors(Number(templateId));

  return <CardList baseSlug="/sensors/" cards={sensors} />;
};

export default Sensors;
