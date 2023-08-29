import * as Yup from "yup";

export type TFormData = Yup.InferType<typeof validationSchema>;

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  x: Yup.number().required("Coordinate X is required"),
  y: Yup.number().required("Coordinate Y is required"),
  z: Yup.number().required("Coordinate Z is required"),
});
