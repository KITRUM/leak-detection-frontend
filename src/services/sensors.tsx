import { api } from "@/services/api";
import { TSensor } from "@/types";
import { TFormData } from "@/components/CreateSensorForm/validation.schema";

export const getSensorsForTemplate = async (templateId: number) => {
  try {
    const response = await api.get(`/templates/${templateId}/sensors`);
    return response.data.result as TSensor[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

//TODO delete if not used in the future
export const sensorRetrieve = async (sensorId: number) => {
  try {
    const response = await api.get(`/sensors/${sensorId}`);
    return response.data.result as TSensor;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const getSensorInteractiveFeedbackMode = async (sensorId: number) => {
  try {
    const response = await api.get(`/sensors/${sensorId}`);
    return response.data.result.configuration.interactiveFeedbackMode;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const sensorInteractiveFeedbackModeUpdate = async (
  sensorId: number,
  mode: boolean
) => {
  try {
    const payload = {
      configuration: {
        interactiveFeedbackMode: mode,
      },
    };

    const response = await api.patch(`/sensors/${sensorId}`, payload);
    return response.data.result as TSensor;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const createSensor = async (templateId: number, data: TFormData) => {
  try {
    const response = await api.post(`/templates/${templateId}/sensors`, data);
    return response.status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const sensorUpdatePin = async (sensorId: number, isPinned: boolean) => {
  try {
    const payload = {
      configuration: {
        pinned: isPinned,
      },
    };

    const response = await api.patch(`/sensors/${sensorId}`, payload);
    return response.data.result.configuration.pinned as TSensor;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const getPinnedSensors = async () => {
  try {
    const response = await api.get("/sensors?pinned=true");
    return response.data.result as TSensor[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
