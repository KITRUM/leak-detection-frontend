import { api } from "@/services/api";
import { TFormData } from "@/components/CreateTemplateForm/validation.schema";
import { TTemplate } from "@/types";

export const getTemplatesForPlatform = async (platformId: number) => {
  try {
    const response = await api.get(`/platforms/${platformId}/templates`);
    return response.data.result as TTemplate[];
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
