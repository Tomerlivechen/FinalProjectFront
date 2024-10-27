import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import ElementFrame from "../Constructors/ElementFrame";
import { colors } from "../Constants/Patterns";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";
import { RxEyeClosed } from "react-icons/rx";
import { IAppUserRegister } from "../Models/AuthModels";
import {
  confirmPasswordValues,
  emailValues,
  firstNameValues,
  lastNameValues,
  passwordValues,
  prefixValues,
  pronounsValues,
  userNameValues,
} from "../Models/FormikModels";

function Register() {
  const [viewPassword, setviewPassword] = useState("password");
  passwordValues.type = viewPassword;
  confirmPasswordValues.type = viewPassword;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const viewPass = () => {
    setviewPassword((prevviewPassword) =>
      prevviewPassword === "password" ? "text" : "password"
    );
  };
  const validationScheme = Yup.object({
    email: Yup.string()
      .email("Bad Email")
      .required("The email address is required"),
    userName: Yup.string().min(2).max(25).required("The user name is required"),
    password: Yup.string()
      .min(8)
      .max(30)
      .required("The password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Must match password"
    ),
    prefix: Yup.string().min(2).max(5),
    first_Name: Yup.string().min(2).max(25).required("First name is required"),
    last_Name: Yup.string().min(2).max(30).required("Last name is required"),
    pronouns: Yup.string().min(2).max(10),
    permissionlevel: Yup.string()
      .required("Please select an option")
      .notOneOf([""], "Please select a valid option"),
  });
  const initalValues: IAppUserRegister = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    prefix: "",
    first_Name: "",
    last_Name: "",
    pronouns: "",
    imageURL:
      "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg",
    permissionlevel: "",
  };

  const submiteRegister = async (user: IAppUserRegister) => {
    setIsLoading(true);
    const response = await auth.register(user);
    if (response.status === 200) {
      dialogs.success("Register Succefull").then(() => {
        navigate("/Login/");
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <ElementFrame
          tailwind="h-fit"
          width="700px"
          overflowY="auto"
          padding="0 pb-4"
        >
          <div
            className={`text-4xl font-bold  text-center ${colors.ButtonFont}`}
          >
            Register
          </div>
          <Formik
            initialValues={initalValues}
            validationSchema={validationScheme}
            onSubmit={(o) => {
              submiteRegister(o);
            }}
          >
            <Form className="mt-5">
              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...emailValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...userNameValues} />
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-6/12 pl-2 pr-2">
                  <FormikElementBuilder {...passwordValues} />
                </div>
                <div className="w-1/12  mt-6 -ml-16 ">
                  {viewPassword == "text" ? (
                    <FaRegEye size={25} onClick={viewPass} />
                  ) : (
                    <RxEyeClosed size={25} onClick={viewPass} />
                  )}
                </div>
                <div className="w-6/12 pr-2">
                  <FormikElementBuilder {...confirmPasswordValues} />
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...prefixValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...firstNameValues} />
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...lastNameValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...pronounsValues} />
                </div>
              </div>
              <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                <label htmlFor="permissionlevel">User Type</label>
                <Field
                  className="rounded-md hover:border-2 border-2 px-2 py-2"
                  id="permissionlevel"
                  name="permissionlevel"
                  as="select"
                  required
                >
                  <option value="">Select a user type</option>
                  <option value="User">Basic User</option>
                  <option value="PowerUser">Power User</option>
                </Field>
                <ErrorMessage
                  name="permissionlevel"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {isLoading && (
                <>
                  <div className=" flex flex-col items-center">
                    <ClimbBoxSpinner /> <br />
                  </div>
                </>
              )}
              <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                <button
                  disabled={isLoading}
                  type="submit"
                  onClick={() => console.log("click")}
                  className={`${colors.Buttons} p-3`}
                >
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </ElementFrame>
      </div>
    </>
  );
}

export default Register;
