import { Template } from '@/types'

export function fetchTemplates(platformId: number): Template[] {
  // Fetch all templates for the specific platform
  // TODO: Fetch the real data from the backend
  return [
    {
      id: 1,
      currents_path: '',
      waves_path: '',
      simulated_leaks_path: '',
      name: 'The first template',
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
      currents_path: '',
      waves_path: '',
      simulated_leaks_path: '',
      name: 'The second template',
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
  ]
}
