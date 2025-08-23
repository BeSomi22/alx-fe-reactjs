import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center mt-5">User Registration</h1>
      <RegistrationForm />
      <h1 className="text-2xl font-bold text-center mt-5">
        User Registration with Formik
      </h1>
      <FormikForm />
    </div>
  );
}

export default App;
