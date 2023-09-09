import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  getSensorInteractiveFeedbackMode,
  sensorInteractiveFeedbackModeUpdate,
} from "@/services/sensors";
import { getChartData } from "@/utils/getChartData";
import Toggler from "@/elements/Toggler/Toggler";
import { useTimeSeriesDataSocket } from "@/hooks/useTimeSeriesDataSocket";
import { useAnomalyDetectionsSocket } from "@/hooks/useAnomalyDetectionsSocket";

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const timeSeriesData = useTimeSeriesDataSocket(+sensorId!);
  const anomalyDetections = useAnomalyDetectionsSocket(+sensorId!);
  const chartData = getChartData(timeSeriesData, anomalyDetections, true);
  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);
  const [isEstimation, setIsEstimation] = useState(false);

  const toggleInteractiveFeedbackMode = async () => {
    const newMode = !interactiveFeedbackMode;
    await sensorInteractiveFeedbackModeUpdate(Number(sensorId), newMode);
    setInteractiveFeedbackMode(newMode);
  };
  // TODO add logic after backend
  const toggleEstimation = () => {
    setIsEstimation(!isEstimation);
  };

  useEffect(() => {
    const interactiveFeedbackModeStatus = async () => {
      try {
        const interactiveFeedbackMode = await getSensorInteractiveFeedbackMode(
          +sensorId!
        );
        if (interactiveFeedbackMode) {
          setInteractiveFeedbackMode(interactiveFeedbackMode);
        }
      } catch (error) {
        console.error("Error retrieving the sensor:", error);
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
          label="Estimation"
          isChecked={isEstimation}
          changeHandler={toggleEstimation}
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
