import { api } from "@/services/api";
import { TSensor } from "@/types";

export const getSensorsForTemplate = async (templateId: number) => {
  try {
    const response = await api.get(`/templates/${templateId}/sensors`);
    return response.data.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const sensorRetrieve = async (sensorId: number) => {
  try {
    const response = await api.get(`/sensors/${sensorId}`);
    return response.data.result as TSensor;
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
