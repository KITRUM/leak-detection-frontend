import { api } from "@/services/api";

export const getSensorsForTemplate = async (templateId: number) => {
  try {
    const response = await api.get(`/templates/${templateId}/sensors`);
    return response.data.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
