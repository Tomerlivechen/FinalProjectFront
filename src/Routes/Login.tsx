import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";
import { colors } from "../Constants/Patterns";
import ElementFrame from "../Constructors/ElementFrame";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";
import { RxEyeClosed } from "react-icons/rx";
import { MYFormikValues } from "../Types/@StructureTypes";
import {
  ReNewPasswordDTO,
  ReSetPassword,
  SendRecoveyEmail,
} from "../Services/emailRecovery-servicets";

const emailValues: MYFormikValues = {
  Title: "Email Address",
  element: "email",
  type: "text",
  placeholder: "Email Address",
  required: true,
  hidden: false,
};

const passwordValues: MYFormikValues = {
  Title: "Password",
  element: "password",
  type: "password",
  placeholder: "Password",
  required: true,
  hidden: false,
};

const LoginPage = () => {
  const [viewPassword, setviewPassword] = useState("password");
  passwordValues.type = viewPassword;
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(LoggedInContext);
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
    password: Yup.string()
      .min(8)
      .max(30)
      .required("The password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
  });
  const initalValues = {
    email: "",
    password: "",
  };

  const forgotPassword = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const email = await dialogs.getEmail();
    const user = await auth.GetUserByEmail(email);
    const token = await auth.ResetPassword(email);

    const tokenDto: ReNewPasswordDTO = {
      userEmail: email,
      token: token.data,
      newPassword: "",
    };
    const DTO: ReSetPassword = {
      tokenDTO: tokenDto,
      userInfo: user.data,
    };

    await SendRecoveyEmail(DTO);
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
            Login
          </div>
          <Formik
            initialValues={initalValues}
            validationSchema={validationScheme}
            onSubmit={(o) => {
              setIsLoading(true);
              auth
                .login(o.email, o.password)
                .then((response) => {
                  dialogs.success("Login Succefull").then(() => {
                    login(response.data.token);
                    navigate("/feed");
                  });
                })
                .catch((error) => {
                  if (error && error.response && error.response.data) {
                    const errorMessages = error.response.data["Login Failed"];
                    if (Array.isArray(errorMessages)) {
                      const message = errorMessages.join(" & ");
                      dialogs.error(message);
                    } else {
                      dialogs.error("An unknown error occurred.");
                    }
                  } else {
                    dialogs.error("An error occurred. Please try again.");
                  }
                })
                .finally(() => {
                  setIsLoading(false);
                  console.log();
                });
            }}
          >
            <Form className="mt-5">
              <div className="flex flex-wrap justify-between">
                <div className="w-full pr-2 pl-2">
                  <FormikElementBuilder {...emailValues} />
                </div>
                <div className="w-full pl-6">
                  <div className="w-1/12 absolute  mt-6 m-28 ">
                    {viewPassword == "text" ? (
                      <FaRegEye size={25} onClick={viewPass} />
                    ) : (
                      <RxEyeClosed size={25} onClick={viewPass} />
                    )}
                  </div>
                  <div className="w-12/12 -ml-6">
                    <FormikElementBuilder {...passwordValues} />
                  </div>
                </div>
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
                  className={`${colors.Buttons} p-3`}
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
          <div className="flex flex-col items-center space-y-4">
            <button className={`${colors.ButtonFont}`} onClick={forgotPassword}>
              {" "}
              Forgot Password{" "}
            </button>
            <button
              onClick={() => navigate("/register")}
              className={`${colors.Buttons} p-3 rounded-xl`}
            >
              Create New Account
            </button>
          </div>
        </ElementFrame>
      </div>
    </>
  );
};

export default LoginPage;
