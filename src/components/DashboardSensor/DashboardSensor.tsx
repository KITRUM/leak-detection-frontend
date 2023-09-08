import React, { useEffect, useState } from "react";
import { AnomalyDetection, Response, TimeSeriesData } from "@/types";
import { getChartData } from "@/utils/getChartData";
import {
  connectAnomalyDetections,
  connectTimeSeriesData,
} from "@/services/sensor";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

type TDashboardSensor = {
  sensorId: number;
  sensorName: string;
};

const DashboardSensor: React.FC<TDashboardSensor> = ({
  sensorId,
  sensorName,
}) => {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [anomalyDetections, setAnomalyDetections] = useState<
    AnomalyDetection[]
  >([]);

  const chartData = getChartData(timeSeriesData, anomalyDetections);

  useEffect(() => {
    const socketTimeSeriesData = connectTimeSeriesData(sensorId!);
    const socketAnomalyDetections = connectAnomalyDetections(sensorId!);

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
      <h1 className="block p-2 text-xl leading-4 text-text-gray-300 hover:text-primary-blue duration-300">
        <Link to={`/sensors/${sensorId}`}>Sensor: {sensorName}</Link>
      </h1>
      <Line data={chartData as never} />
    </div>
  );
};

export default DashboardSensor;
