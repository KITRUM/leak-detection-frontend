import React from "react";
import { getChartData } from "@/utils/getChartData";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useTimeSeriesDataSocket } from "@/hooks/useTimeSeriesDataSocket";
import { useAnomalyDetectionsSocket } from "@/hooks/useAnomalyDetectionsSocket";

type TDashboardSensor = {
  sensorId: number;
  sensorName: string;
};

const DashboardSensor: React.FC<TDashboardSensor> = ({
  sensorId,
  sensorName,
}) => {
  const timeSeriesData = useTimeSeriesDataSocket(sensorId);
  const anomalyDetections = useAnomalyDetectionsSocket(sensorId);
  const chartData = getChartData(timeSeriesData, anomalyDetections);

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
