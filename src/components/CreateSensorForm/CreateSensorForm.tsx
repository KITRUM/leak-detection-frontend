import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useModal } from "@/context/ModalContext";
import {
  TFormData,
  validationSchema,
} from "@/components/CreateSensorForm/validation.schema";
import { initialValues } from "@/components/CreateSensorForm/initialValues";
import { createSensor } from "@/services/sensors";
import PrimaryButton from "@/elements/PrimaryButton/PrimaryButton";

type MyFormikHelpers = FormikHelpers<TFormData> & {
  setValues: (values: TFormData, shouldValidate?: boolean) => void;
};

const CreateSensorForm = () => {
  const { openModal } = useModal();
  const openSuccessModal = () =>
    openModal("Sensor successfully created", "success");
  const openErrorModal = () => openModal("Sensor was not created", "error");

  const onSubmit = async (data: TFormData, actions: MyFormikHelpers) => {
    const response = await createSensor(1, data);

    if (response === 201) {
      actions.setSubmitting(false);
      actions.resetForm();
      openSuccessModal();
    } else {
      actions.setSubmitting(false);
      openErrorModal();
    }
  };

  return (
    <div className="p-8">
      <div className="text-2xl">Create a new sensor</div>
      <div className="w-full border-b border-gray-600 pt-3 text-xl">
        Sensor Details
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="grid grid-cols-4 gap-4 p-4">
              <div className="flex flex-col">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Sensor name"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="name" className="text-sm">
                  Please enter the name of the sensor you want to create.
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="x"
                  name="x"
                  placeholder="Coordinate X"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="x" className="text-sm">
                  Coordinate X
                </label>
                <ErrorMessage
                  name="x"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="y"
                  name="y"
                  placeholder="Coordinate Y"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="y" className="text-sm">
                  Coordinate Y
                </label>
                <ErrorMessage
                  name="y"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="z"
                  name="z"
                  placeholder="Coorditnate Z"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="z" className="text-sm">
                  Coordinate Z
                </label>
                <ErrorMessage
                  name="z"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <PrimaryButton name="Create sensor" type="submit" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateSensorForm;
