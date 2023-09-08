import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnomalyDetection, Response, TimeSeriesData } from "@/types";
import { Line } from "react-chartjs-2";
import {
  getSensorInteractiveFeedbackMode,
  sensorInteractiveFeedbackModeUpdate,
} from "@/services/sensors";
import {
  connectAnomalyDetections,
  connectTimeSeriesData,
} from "@/services/sensor";
import { getChartData } from "@/utils/getChartData";
import Toggler from "@/elements/Toggler/Toggler";

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [anomalyDetections, setAnomalyDetections] = useState<
    AnomalyDetection[]
  >([]);
  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);
  const [isEstimation, setIsEstimation] = useState(false);

  const chartData = getChartData(timeSeriesData, anomalyDetections);

  const toggleInteractiveFeedbackMode = async () => {
    const newMode = !interactiveFeedbackMode;
    await sensorInteractiveFeedbackModeUpdate(Number(sensorId), newMode);
    setInteractiveFeedbackMode(newMode);
  };

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

    const socketTimeSeriesData = connectTimeSeriesData(+sensorId!);
    const socketAnomalyDetections = connectAnomalyDetections(+sensorId!);

    socketTimeSeriesData.onmessage = (event) => {
      const response: Response<TimeSeriesData> = JSON.parse(event.data);

      if (Array.isArray(response.result)) {
        const tsdArray = response.result as TimeSeriesData[];
        setTimeSeriesData(tsdArray);
      } else {
        const tsd = response.result as TimeSeriesData;
        setTimeSeriesData((prevData) => [...prevData, tsd]);
      }
    };

    socketAnomalyDetections.onmessage = (event) => {
      const response: Response<AnomalyDetection> = JSON.parse(event.data);

      if (Array.isArray(response.result)) {
        const result = response.result as AnomalyDetection[];
        setAnomalyDetections(result);
      } else {
        const result = response.result as AnomalyDetection;
        setAnomalyDetections((prevData) => [...prevData, result]);
      }
    };

    return () => {
      socketTimeSeriesData.close();
      socketAnomalyDetections.close();
    };
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
