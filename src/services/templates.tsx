import { api } from "@/services/api";
import { TFormData } from "@/components/CreateTemplateForm/validation.schema";
import { TTemplate } from "@/types";

export const getTemplatesForField = async (fieldId: number) => {
  try {
    const response = await api.get(`/fields/${fieldId}/templates`);
    return response.data.result as TTemplate[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const createTemplate = async (fieldId: number, data: TFormData) => {
  try {
    const response = await api.post(`/fields/${fieldId}/templates`, data);
    return response.status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
