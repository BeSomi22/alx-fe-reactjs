import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    alert("Form submitted successfully!");
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col gap-4 w-80 mx-auto mt-10">
        <Field
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
        />
        <ErrorMessage
          name="username"
          component="p"
          className="text-red-500 text-sm"
        />

        <Field
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <ErrorMessage
          name="email"
          component="p"
          className="text-red-500 text-sm"
        />

        <Field
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <ErrorMessage
          name="password"
          component="p"
          className="text-red-500 text-sm"
        />

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </Form>
    </Formik>
  );
}

export default FormikForm;
