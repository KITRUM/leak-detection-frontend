import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  TFormData,
  validationSchema,
} from "@/scenes/CreateTemplate/validation.schema";
import { initialValues } from "@/scenes/CreateTemplate/initialValues";
import { createTemplate } from "@/services/templates";
import { useModal } from "@/context/ModalContext";

type MyFormikHelpers = FormikHelpers<TFormData> & {
  setValues: (values: TFormData, shouldValidate?: boolean) => void;
};

const CreateTemplate = () => {
  const { openModal } = useModal();
  const openTemplateCreatedModal = () =>
    openModal("Template successfully created");
  const onSubmit = async (data: TFormData, actions: MyFormikHelpers) => {
    try {
      const response = await createTemplate(1, data);

      if (response === 201) {
        actions.setSubmitting(false);
        actions.resetForm();
        openTemplateCreatedModal();
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="text-2xl">Create a new template</div>
      <div className="w-full border-b border-gray-600 pt-3 text-xl">
        Template Details
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="flex flex-col">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Template name"
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
                  id="angleFromNorth"
                  name="angleFromNorth"
                  placeholder="Angle from North [degrees]"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="angleFromNorth" className="text-sm">
                  Angle between the North and the normal to Template&apos;s
                  Fore, measured clockwise.
                </label>
                <ErrorMessage
                  name="angleFromNorth"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="internalVolume"
                  name="internalVolume"
                  placeholder="Internal volume [m³]"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="internalVolume" className="text-sm">
                  Please enter the internal volume of the semi-enclosed
                  template. If the volume is to be calculated from the
                  dimensions below, please leave the field empty.
                </label>
                <ErrorMessage
                  name="internalVolume"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Height [m]"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="height" className="text-sm">
                  Roof height: if there is no roof, please leave the field
                  empty.
                </label>
                <ErrorMessage
                  name="height"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="length"
                  name="length"
                  placeholder="Length [m]"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="length" className="text-sm">
                  Distance from Fore to Aft at the base, if the walls are
                  inclined.
                </label>
                <ErrorMessage
                  name="length"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="width"
                  name="width"
                  placeholder="Width [m]"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <label htmlFor="width" className="text-sm">
                  Distance from Port to Starboard at the base, if the walls are
                  inclined.
                </label>
                <ErrorMessage
                  name="width"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>
            </div>

            <div className="w-full border-b border-gray-600 pt-3 text-xl">
              General configuration
            </div>
            <div className="grid grid-cols-5 gap-4 p-4">
              <div>Porosity</div>
              <div className="flex flex-col">
                <Field
                  type="number"
                  id="porosityFore"
                  name="porosityFore"
                  placeholder="Fore"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="porosityFore"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="porosityAft"
                  name="porosityAft"
                  placeholder="Aft"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="porosityAft"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="porosityPort"
                  name="porosityPort"
                  placeholder="Port"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="porosityPort"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="porosityStarboard"
                  name="porosityStarboard"
                  placeholder="Starboard"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="porosityStarboard"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>Wall area</div>
              <div className="flex flex-col">
                <Field
                  type="number"
                  id="wallAreaFore"
                  name="wallAreaFore"
                  placeholder="Fore"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="wallAreaFore"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="wallAreaAft"
                  name="wallAreaAft"
                  placeholder="Aft"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="wallAreaAft"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="wallAreaPort"
                  name="wallAreaPort"
                  placeholder="Port"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="wallAreaPort"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="wallAreaStarboard"
                  name="wallAreaStarboard"
                  placeholder="Starboard"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="wallAreaStarboard"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>Inclination</div>
              <div className="flex flex-col">
                <Field
                  type="number"
                  id="inclinationFore"
                  name="inclinationFore"
                  placeholder="Fore"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="inclinationFore"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="inclinationAft"
                  name="inclinationAft"
                  placeholder="Aft"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="inclinationAft"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="inclinationPort"
                  name="inclinationPort"
                  placeholder="Port"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="inclinationPort"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex flex-col">
                <Field
                  type="number"
                  id="inclinationStarboard"
                  name="inclinationStarboard"
                  placeholder="Starboard"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                />
                <ErrorMessage
                  name="inclinationStarboard"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>
            </div>

            <div className="w-full border-b border-gray-600 pt-3 text-xl">
              Oceanographic Data Files
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col">
                <label htmlFor="oceanographicData" className="p-2 text-sm">
                  Waves File
                </label>
                <Field
                  type="file"
                  id="wavesFile"
                  name="wavesFile"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                  placeholder="no file selected"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="oceanographicData" className="p-2 text-sm">
                  Currents file
                </label>
                <Field
                  type="file"
                  id="currentsFile"
                  name="currentsFile"
                  className="leading-2 mb-3 rounded-md border p-2 shadow focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-cyan-500"
                  placeholder="no file selected"
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

export default CreateTemplate;
