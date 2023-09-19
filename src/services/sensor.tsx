import { WEBSOCKET } from "@/constants/common";

export const connectTimeSeriesData = (sensorId: number) => {
  const timeSeriesDataWebsocketUrl = `/sensors/${sensorId}/time-series-data`;
  return new WebSocket(`${WEBSOCKET}${timeSeriesDataWebsocketUrl}`);
};

export const connectAnomalyDetections = (sensorId: number) => {
  const anomalyDetectionsWebsocketUrl = `/sensors/${sensorId}/anomaly-detections`;
  return new WebSocket(`${WEBSOCKET}${anomalyDetectionsWebsocketUrl}`);
};

export const connectSensorEvents = (sensorId: number) => {
  const sensorEventsWebsocketUrl = `/events/sensors/${sensorId}`;
  return new WebSocket(`${WEBSOCKET}${sensorEventsWebsocketUrl}`);
};
