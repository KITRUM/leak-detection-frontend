import { TSensor, TSensorEvent, Response } from "@/types";
import { useParams } from "react-router-dom";
import CardList from "@/components/SensorsCardsList";
import { useEffect, useState } from "react";
import { getSensorsForTemplate } from "@/services/sensors";

const Sensors = () => {
  const [sensors, setSensors] = useState<TSensor[] | []>([]);
  const { templateId } = useParams<string>();
  const [sensorsEvents, setSensorsEvents] = useState<
    Record<number, TSensorEvent>
  >({});

  // TODO: Change to the uniform sensor ID
  const hostUrl = "ws://localhost:8000";

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

    // Establish events websocket connection for each sensor
    for (const sensor of sensors) {
      const socketSensorEvents = new WebSocket(
        `${hostUrl}/sensors/${sensor.id}/events`
      );

      // Handle sensor events messages, received from the WebSocket
      socketSensorEvents.onmessage = (event) => {
        const response: Response<TSensorEvent> = JSON.parse(event.data);
        const sensorEvent = response.result as TSensorEvent;
        setSensorsEvents((prevEvents) => ({
          ...prevEvents,
          [sensor.id]: sensorEvent,
        }));
      };
    }
  }, []);

  if (!sensors) {
    return <div className="p-6">No sensors for this template</div>;
  }

  return (
    <CardList baseSlug="/sensors/" sensors={sensors} events={sensorsEvents} />
  );
};

export default Sensors;
