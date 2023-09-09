import { useEffect, useState } from "react";
import { Response, TimeSeriesData } from "@/types";
import { connectTimeSeriesData } from "@/services/sensor";

export const useTimeSeriesDataSocket = (sensorId: number) => {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);

  useEffect(() => {
    const socketTimeSeriesData = connectTimeSeriesData(+sensorId!);

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

    return () => {
      socketTimeSeriesData.close();
    };
  }, []);

  return timeSeriesData;
};
