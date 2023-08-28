import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useModal } from "@/context/ModalContext";
import {
  TFormData,
  validationSchema,
} from "@/scenes/CreateSensor/validation.schema";
import { initialValues } from "@/scenes/CreateSensor/initialValues";
import { createSensor } from "@/services/sensors";

type MyFormikHelpers = FormikHelpers<TFormData> & {
  setValues: (values: TFormData, shouldValidate?: boolean) => void;
};

const CreateSensor = () => {
  const { openModal } = useModal();
  const openSensorCreatedModal = () => openModal("Sensor successfully created");

  const onSubmit = async (data: TFormData, actions: MyFormikHelpers) => {
    try {
      const response = await createSensor(1, data);

      if (response === 201) {
        actions.setSubmitting(false);
        actions.resetForm();
        openSensorCreatedModal();
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
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
                  Please enter the name of the template you want to create.
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
              <button
                type="submit"
                className="flex items-center justify-center min-w-max px-6 py-2 rounded border border-transparent bg-primary-blue text-base text-white shadow-lg duration-300 hover:bg-white hover:text-primary-blue hover:border hover:border-primary-blue"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateSensor;
