// The basic PlatformCard item contracttypes

export type Platform = {
  id: number;
  name: string;
};

export type TTemplate = {
  id: number;
  currents_path: string; // Path
  waves_path: string; // Path
  simulated_leaks_path: string; // Path
  name: string;
  angle_from_north: number;
  height: number | null;

  // Semi-closed parameters
  porosity: object | null;
  wall_area: object | null;
  inclination: object | null;

  internal_volume: number | null;

  // Required if internal_volume is not defined
  length: number | null;
  width: number | null;

  platformId: number;
};

export type TSensorConfiguration = {
  interactiveFeedbackMode: boolean;
};

export type TSensor = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  configuration: TSensorConfiguration;
};

export type TSensorEvent = {
  id: number;
  type: string;
  sensorId: number;
};

export type TimeSeriesData = {
  id: number;
  ppmv: number;
  timestamp: Date;
};

export type AnomalyDetection = {
  id: number;
  interactiveFeedbackMode: boolean;
  value: string;
  timeSeriesData: TimeSeriesData;
};

export type SensorRetrieveItem = {
  ppmv: number;
  timestamp: Date;
  deviation: string | null;
  configuration: TSensorConfiguration;
};

export type Response<Type> = {
  result: Type | Type[];
};
