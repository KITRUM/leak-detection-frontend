import * as Yup from 'yup'
// TODO choose the file extantion for the template create form
// const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  angleFromNorth: Yup.number()
    .required('Angle is required')
    .min(0, 'Angle must be greater than or equal to 0')
    .max(360, 'Angle must be less than or equal to 360'),
  internalVolume: Yup.number(),
  height: Yup.number(),
  length: Yup.number(),
  width: Yup.number(),
  porosityFore: Yup.number().required('Porosity Fore volume is required'),
  porosityAft: Yup.number().required('Porosity Aft volume is required'),
  porosityPort: Yup.number().required('Porosity Port volume is required'),
  porosityStarboard: Yup.number().required(
    'Porosity Starboard volume is required'
  ),
  wallAreaFore: Yup.number().required('Wall Area Fore volume is required'),
  wallAreaAft: Yup.number().required('Wall Area Aft volume is required'),
  wallAreaPort: Yup.number().required('Wall Area Port volume is required'),
  wallAreaStarboard: Yup.number().required(
    'Wall Area Starboard volume is required'
  ),
  inclinationFore: Yup.number().required('Inclination Fore volume is required'),
  inclinationAft: Yup.number().required('Inclination Aft volume is required'),
  inclinationPort: Yup.number().required('Inclination Port volume is required'),
  inclinationStarboard: Yup.number().required(
    'Inclination Starboard volume is required'
  ),
})
