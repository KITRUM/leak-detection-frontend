const hostUrl = "ws://localhost:8000";

export const connectTimeSeriesData = (sensorId: string) => {
  const timeSeriesDataWebsocketUrl = `/sensors/${sensorId}/time-series-data`;
  return new WebSocket(`${hostUrl}${timeSeriesDataWebsocketUrl}`);
};

export const connectAnomalyDetections = (sensorId: string) => {
  const anomalyDetectionsWebsocketUrl = `/sensors/${sensorId}/anomaly-detections`;
  return new WebSocket(`${hostUrl}${anomalyDetectionsWebsocketUrl}`);
};
