import { Template } from "@/types";
import { api } from "@/services/api";
import { TFormData } from "@/scenes/CreateTemplate/validation.schema";

export function fetchTemplates(platformId: number): Template[] {
  // Fetch all Templates for the specific platform
  // TODO: Fetch the real data from the backend
  return [
    {
      id: 1,
      currents_path: "",
      waves_path: "",
      simulated_leaks_path: "",
      name: "The first template",
      angle_from_north: 12,
      height: null,
      porosity: null,
      wall_area: null,
      inclination: null,
      internal_volume: null,
      length: null,
      width: null,
      platformId: platformId,
    },
    {
      id: 2,
      currents_path: "",
      waves_path: "",
      simulated_leaks_path: "",
      name: "The second template",
      angle_from_north: 12,
      height: null,
      porosity: null,
      wall_area: null,
      inclination: null,
      internal_volume: null,
      length: null,
      width: null,
      platformId: platformId,
    },
  ];
}

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
