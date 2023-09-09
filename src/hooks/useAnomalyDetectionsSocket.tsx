import { useEffect, useState } from "react";
import { AnomalyDetection, Response } from "@/types";
import { connectAnomalyDetections } from "@/services/sensor";

export const useAnomalyDetectionsSocket = (sensorId: number) => {
  const [anomalyDetections, setAnomalyDetections] = useState<
    AnomalyDetection[]
  >([]);

  useEffect(() => {
    const socketAnomalyDetections = connectAnomalyDetections(sensorId);

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
      socketAnomalyDetections.close();
    };
  }, []);

  return anomalyDetections;
};
