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
    throw new Error(`Error fetching sensor ${sensorId}`);
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

export const sensorInteractiveFeedbackModeToggle = async (sensorId: number) => {
  try {
    const response = await api.patch(
      `/sensors/${sensorId}/interactive-feedback-mode/toggle`
    );
    return response.data.result.configuration.interactiveFeedbackMode;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response.status === 422) {
      throw new Error(
        "You can not toggle interactive feedback mode until enough time series data items are collected."
      );
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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

export const sensorTogglePin = async (sensorId: number) => {
  try {
    const response = await api.patch(`/sensors/${sensorId}/pin/toggle`);
    return response.data.result.configuration.pinned;
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
