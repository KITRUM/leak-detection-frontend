import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  getSensorInteractiveFeedbackMode,
  sensorInteractiveFeedbackModeToggle,
} from "@/services/sensors";
import { getChartData } from "@/utils/getChartData";
import Toggler from "@/elements/Toggler/Toggler";
import { useTimeSeriesDataSocket } from "@/hooks/useTimeSeriesDataSocket";
import { useAnomalyDetectionsSocket } from "@/hooks/useAnomalyDetectionsSocket";
import { useModal } from "@/context/ModalContext";

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const timeSeriesData = useTimeSeriesDataSocket(+sensorId!);
  const anomalyDetections = useAnomalyDetectionsSocket(+sensorId!);
  const chartData = getChartData(timeSeriesData, anomalyDetections);
  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);
  const [isSimulation, setIsSimulation] = useState(false);
  const { openModal } = useModal();
  const toggleInteractiveFeedbackModeModal = (message: string) =>
    openModal(message);

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

  useEffect(() => {
    const interactiveFeedbackModeStatus = async () => {
      const interactiveFeedbackMode = await getSensorInteractiveFeedbackMode(
        +sensorId!
      );

      if (typeof interactiveFeedbackMode === "boolean") {
        setInteractiveFeedbackMode(interactiveFeedbackMode);
      }
    };

    interactiveFeedbackModeStatus();
  }, []);

  return (
    <div className="p-2">
      <h1 className="block p-2 text-xl leading-4 text-text-gray-300">
        Sensor: {sensorId}
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
  );
};

export default Sensor;
