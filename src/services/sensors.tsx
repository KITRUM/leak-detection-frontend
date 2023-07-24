import { Sensor } from '@/types'

export function fetchSensors(templateId: number): Sensor[] {
  // Fetch all sensors for the specific template
  // TODO: Fetch the real data from the backend

  return [
    {
      id: 1,
      name: 'First sensor',
      templateId: templateId,
    },
    {
      id: 2,
      name: 'Second sensor',
      templateId: templateId,
    },
  ]
}
