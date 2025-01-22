import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
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
import DinoSpinner from "../Spinners/DinoSpinner";
import { MotionFrame } from "../Components/Objects/MotionFrame";

const Register = () => {
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Must match password")
      .required("The password confirmation is required"),
    prefix: Yup.string()
      .matches(/[^.]$/, "A period at the end of the prefix is unnecessary.")
      .min(2, "Prefix must be at least 2 characters.")
      .max(5, "Prefix must not exceed 5 characters."),
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
    // eslint-disable-next-line no-debugger
    debugger;
    setIsLoading(true);
    const response = await auth.register(user);
    if (response.status === 200) {
      dialogs.success("Register successful").then(() => {
        navigate("/login");
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <MotionFrame>
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
                <div className="flex flex-wrap md:justify-between justify-center">
                  <div className="md:w-1/2 w-7/12 pr-2 md:pl-2">
                    <FormikElementBuilder {...emailValues} />
                  </div>
                  <div className="md:w-1/2 w-7/12 md:pl-2 pr-2">
                    <FormikElementBuilder {...userNameValues} />
                  </div>
                </div>
                <div className="flex flex-wrap md:justify-between justify-center">
                  <div className="md:w-6/12 w-7/12 md:pl-2 pr-2">
                    <FormikElementBuilder {...passwordValues} />
                  </div>
                  <div className="md:w-1/12 w-7/12  md:mt-1 md:-ml-16 -mt-20 ml-52">
                    {viewPassword == "text" ? (
                      <FaRegEye size={25} onClick={viewPass} />
                    ) : (
                      <RxEyeClosed size={25} onClick={viewPass} />
                    )}
                  </div>
                  <div className="md:w-6/12 w-7/12 pr-2">
                    <FormikElementBuilder {...confirmPasswordValues} />
                  </div>
                </div>
                <div className="flex flex-wrap md:justify-between justify-center">
                  <div className="md:w-1/2 w-7/12 pr-2 md:pl-2">
                    <FormikElementBuilder {...prefixValues} />
                  </div>
                  <div className="md:w-1/2 w-7/12 md:pl-2 pr-2">
                    <FormikElementBuilder {...firstNameValues} />
                  </div>
                </div>

                <div className="flex flex-wrap md:justify-between justify-center">
                  <div className="md:w-1/2 w-7/12 pr-2 md:pl-2">
                    <FormikElementBuilder {...lastNameValues} />
                  </div>
                  <div className="md:w-1/2 w-7/12 md:pl-2 pr-2">
                    <FormikElementBuilder {...pronounsValues} />
                  </div>
                </div>
                <div className="font-extralight form-group flex flex-col gap-2 md:w-1/2 w-7/12 mx-auto text-lg mt-5">
                  <label htmlFor="permissionlevel">User Type</label>
                  <Field
                    className={`rounded-md hover:border-2 border-2 px-2 py-2 ${colors.TextBox}`}
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
                      <DinoSpinner size={40} /> <br />
                    </div>
                  </>
                )}
                <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`${colors.Buttons} p-3`}
                  >
                    Register
                  </button>
                </div>
              </Form>
            </Formik>
          </ElementFrame>
        </div>
      </MotionFrame>
    </>
  );
};

export default Register;
