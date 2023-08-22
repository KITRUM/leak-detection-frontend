import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnomalyDetection, Response, TimeSeriesData } from "@/types";
import { Line } from "react-chartjs-2";
import {
  sensorInteractiveFeedbackModeUpdate,
  sensorRetrieve,
} from "@/services/sensors";
import {
  connectAnomalyDetections,
  connectTimeSeriesData,
} from "@/services/sensor";
import { getChartData } from "@/components/Sensor/getChartData";

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [anomalyDetections, setAnomalyDetections] = useState<
    AnomalyDetection[]
  >([]);
  const [interactiveFeedbackMode, setInteractiveFeedbackMode] =
    useState<boolean>(false);

  const chartData = getChartData(timeSeriesData, anomalyDetections);

  const toggleInteractiveFeedbackMode = async () => {
    const newMode = !interactiveFeedbackMode;
    await sensorInteractiveFeedbackModeUpdate(Number(sensorId), newMode);
    setInteractiveFeedbackMode(newMode);
  };

  useEffect(() => {
    const interactiveFeedbackModeToggle = async () => {
      try {
        const sensor = await sensorRetrieve(Number(sensorId));
        if (sensor) {
          setInteractiveFeedbackMode(
            sensor.configuration.interactiveFeedbackMode
          );
        }
      } catch (error) {
        console.error("Error retrieving the sensor:", error);
      }
    };

    interactiveFeedbackModeToggle();

    const socketTimeSeriesData = connectTimeSeriesData(sensorId!);
    const socketAnomalyDetections = connectAnomalyDetections(sensorId!);

    socketTimeSeriesData.onmessage = (event) => {
      const response: Response<TimeSeriesData> = JSON.parse(event.data);

      if (Array.isArray(response.result)) {
        const tsdArray = response.result as TimeSeriesData[];
        setTimeSeriesData(tsdArray);
        // console.log("TimeSeriesData", tsdArray);
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
        // console.log("AnomalyDetections", result);
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
    <div>
      <h1 className="text-lg">Sensor: {sensorId}</h1>
      <label>
        Interactive Feedback Mode
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary-blue checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary-blue checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary-blue checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary-blue dark:checked:after:bg-primary-blue dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          checked={interactiveFeedbackMode}
          onChange={toggleInteractiveFeedbackMode}
        />
      </label>
      <Line data={chartData as never} />
    </div>
  );
};

export default Sensor;
