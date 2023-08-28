import * as Yup from "yup";

export type TFormData = Yup.InferType<typeof validationSchema>;

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  x: Yup.number()
    .required("Coordinate X is required")
    .min(0, "Coordinate X must be greater than or equal to 0"),
  y: Yup.number()
    .required("Coordinate Y is required")
    .min(0, "Coordinate Y must be greater than or equal to 0"),
  z: Yup.number()
    .required("Coordinate Z is required")
    .min(0, "Coordinate Z must be greater than or equal to 0"),
});
