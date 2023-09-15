import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { TSensor } from "@/types";
import {
  sensorInteractiveFeedbackModeToggle,
  sensorRetrieve,
} from "@/services/sensors";
import Toggler from "@/elements/Toggler/Toggler";
import { useTimeSeriesDataSocket } from "@/hooks/useTimeSeriesDataSocket";
import { useAnomalyDetectionsSocket } from "@/hooks/useAnomalyDetectionsSocket";
import { useModal } from "@/context/ModalContext";
import EmptySceneMessage from "@/elements/EmptySceneMessage";
import { getChartData } from "@/utils/getChartData";
import { Maybe } from "yup";

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const timeSeriesData = useTimeSeriesDataSocket(+sensorId!);
  const anomalyDetections = useAnomalyDetectionsSocket(+sensorId!);
  const chartData = getChartData(timeSeriesData, anomalyDetections);
  const [currentSensor, setCurrentSensor] = useState<TSensor | null>(null);
  const [loading, setIsLoading] = useState(true);

  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);
  const [isSimulation, setIsSimulation] = useState(false);

  const { openModal } = useModal();
  const toggleInteractiveFeedbackModeModal = (message: string) =>
    openModal(message, "error");

  useEffect(() => {
    const fetchSensor = async () => {
      const sensor: Maybe<TSensor> = await sensorRetrieve(+sensorId!);

      if (sensor) {
        setCurrentSensor(sensor);
        setInteractiveFeedbackMode(
          sensor.configuration.interactiveFeedbackMode
        );
      }
      setIsLoading(false);
    };

    fetchSensor();
  }, []);

  const toggleInteractiveFeedbackMode = async () => {
    try {
      const toggled = await sensorInteractiveFeedbackModeToggle(
        Number(sensorId)
      );
      setInteractiveFeedbackMode(toggled);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toggleInteractiveFeedbackModeModal(error.message);
    }
  };

  // TODO add logic after backend
  const toggleSimulation = () => {
    setIsSimulation(!isSimulation);
  };

  return (
    <div className="w-full h -full">
      {currentSensor ? (
        <div className="p-2">
          <h1 className="block p-2 text-xl leading-4 text-text-gray-300">
            Sensor: {currentSensor.name}
          </h1>
          <div className="flex justify-start">
            <Toggler
              label="Simulation"
              isChecked={isSimulation}
              changeHandler={toggleSimulation}
            />
            <Toggler
              label="Interactive Feedback Mode"
              isChecked={interactiveFeedbackMode}
              changeHandler={toggleInteractiveFeedbackMode}
            />
          </div>
          <Line data={chartData as never} />
        </div>
      ) : (
        !loading && (
          <EmptySceneMessage message="No sensors are pinned or loaded" />
        )
      )}
    </div>
  );
};

export default Sensor;
