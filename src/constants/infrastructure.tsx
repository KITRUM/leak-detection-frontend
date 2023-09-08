export enum INFRASTRUCTURE {
  HOME = "/",
  PLATFORMS = "/platforms",
  TEMPLATES = "/platforms/:platformId",
  CREATE_TEMPLATE = "platforms/:platformId/create-template",
  SENSORS_LIST = "/templates/:templateId",
  SENSOR = "/sensors/:sensorId",
  CREATE_SENSOR = "templates/:template_id/create-sensor",
  ABOUT = "/about",
}
