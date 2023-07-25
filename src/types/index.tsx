// The basic Card item contracttypes

export type Platform = {
  id: number
  name: string
}

export type Template = {
  id: number
  currents_path: string // Path
  waves_path: string // Path
  simulated_leaks_path: string // Path
  name: string
  angle_from_north: number
  height: number | null

  // Semi-closed parameters
  porosity: object | null
  wall_area: object | null
  inclination: object | null

  internal_volume: number | null

  // Required if internal_volume is not defined
  length: number | null
  width: number | null

  platformId: number
}

export type Sensor = {
  id: number
  name: string
  templateId: number
}

export type TimeSeriesData = {
  id: number
  ppmv: number
  timestamp: Date
}

export type AnomalyDetection = {
  id: number
  value: string
  timeSeriesData: TimeSeriesData
}

export type SensorRetrieveItem = {
  ppmv: number
  timestamp: Date
  deviation: string | null
}

export type Response<Type> = {
  result: Type | Type[]
}
