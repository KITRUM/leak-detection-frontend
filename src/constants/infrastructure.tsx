export enum INFRASTRUCTURE {
  HOME = "/",
  FIELDS = "/fields",
  TEMPLATES = "/fields/:fieldId",
  CREATE_TEMPLATE = "fields/:fieldId/create-template",
  SENSORS_LIST = "/templates/:templateId",
  SENSOR = "/sensors/:sensorId",
  CREATE_SENSOR = "templates/:template_id/create-sensor",
  ABOUT = "/about",
}
