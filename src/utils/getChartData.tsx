import { AnomalyDetection, TimeSeriesData } from "@/types";

enum ANOMALY_DEVIATION_COLORS {
  UNDEFINED = "#e1e1e1",
  CRITICAL = "red",
  WARNING = "yellow",
  OK = "green",
}

export const getChartData = (
  timeSeriesData: TimeSeriesData[],
  anomalyDetections: AnomalyDetection[]
) => {
  return {
    labels: timeSeriesData.map((tsd) => {
      const asDate = new Date(tsd.timestamp);
      return `${asDate.getFullYear()}-${asDate.getMonth()}-${asDate.getDate()}  ${asDate.getHours()}:${asDate.getMinutes()}`;
    }) as string[],
    datasets: [
      {
        type: "line",
        label: "Anomaly detections",
        data: anomalyDetections.map((data) => data.timeSeriesData.ppmv),
        backgroundColor: anomalyDetections.map((element: AnomalyDetection) => {
          return ANOMALY_DEVIATION_COLORS[
            element.value.toUpperCase() as keyof typeof ANOMALY_DEVIATION_COLORS
          ];
        }),
        borderColor: "gray",
        borderWidth: 0.5,
      },
      {
        type: "line",
        label: "Time series data",
        data: timeSeriesData.map((data) => data.ppmv),
        backgroundColor: ["#e1e1e1"], // The bubble should be in neutral color
        borderColor: "gray",
        borderWidth: 0.5,
      },
      {
        type: "bar",
        label: "Interactive Feedback",
        data: anomalyDetections.map((data) => data.timeSeriesData.ppmv),
        backgroundColor: anomalyDetections.map((element: AnomalyDetection) => {
          return element.interactiveFeedbackMode
            ? "rgba(148, 183, 255, 0.7)"
            : "transparent";
        }),
        borderRadius: 4,
      },
    ],
  };
};
