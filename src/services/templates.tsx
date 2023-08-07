import { api } from "@/services/api";
import { TFormData } from "@/scenes/CreateTemplate/validation.schema";

export const getTemplatesForPlatform = async (platformId: number) => {
  try {
    const response = await api.get(`/platforms/${platformId}/templates`);
    return response.data.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const createTemplate = async (platformId: number, data: TFormData) => {
  try {
    const response = await api.post(`/platforms/${platformId}/templates`, data);
    return response.status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
