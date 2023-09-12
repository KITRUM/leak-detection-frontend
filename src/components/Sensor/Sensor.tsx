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
  const chartData = getChartData(timeSeriesData, anomalyDetections);
  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);
  const [isEstimation, setIsEstimation] = useState(false);

  const toggleInteractiveFeedbackMode = async () => {
    try {
      const estimationMod = await sensorInteractiveFeedbackModeUpdate(
        Number(sensorId)
      );

      if (typeof estimationMod === "boolean") {
        setInteractiveFeedbackMode(estimationMod);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Sensor not found");
      }
      console.error("Error updating the sensor:", error);
    }
  };

  // TODO add logic after backend
  const toggleEstimation = () => {
    setIsEstimation(!isEstimation);
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
