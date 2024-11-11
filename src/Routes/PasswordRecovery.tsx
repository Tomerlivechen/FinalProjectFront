import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import { colors } from "../Constants/Patterns";
import ElementFrame from "../Constructors/ElementFrame";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";
import { RxEyeClosed } from "react-icons/rx";
import { MYFormikValues } from "../Types/@StructureTypes";
import { PasswordRecovery } from "../Models/AuthModels";
import * as URLencode from "urlencode";
import { isEqual } from "lodash";
import DinoSpinner from "../Spinners/DinoSpinner";

const emailValues: MYFormikValues = {
  Title: "Email Address",
  element: "userEmail",
  type: "text",
  placeholder: "Email Address",
  required: true,
  hidden: false,
};

const passwordValues: MYFormikValues = {
  Title: "New Password",
  element: "newPassword",
  type: "password",
  placeholder: "New Password",
  required: true,
  hidden: false,
};

function PasswordRecoveryPage() {
  const [searchParams] = useSearchParams();
  const [viewPassword, setviewPassword] = useState("password");
  passwordValues.type = viewPassword;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = () => {
    const _token = searchParams.get("token");
    if (_token) {
      if (!isEqual(token, _token)) setToken(_token);
    }
  };

  const viewPass = () => {
    setviewPassword((prevviewPassword) =>
      prevviewPassword === "password" ? "text" : "password"
    );
  };
  const validationScheme = Yup.object({
    userEmail: Yup.string()
      .email("Bad Email")
      .required("The email address is required"),
    newPassword: Yup.string()
      .min(8)
      .max(30)
      .required("The password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
  });
  const initalValues: PasswordRecovery = {
    userEmail: "",
    token: "",
    newPassword: "",
  };

  const handleSubmit = async (data: PasswordRecovery) => {
    setIsLoading(true);
    if (token) {
      const recoveryValues: PasswordRecovery = {
        userEmail: data.userEmail,
        token: URLencode.decode(token),
        newPassword: data.newPassword,
      };
      try {
        const respons = await auth.SetNewPassword(recoveryValues);
        if (respons.status === 200) {
          dialogs.success("Password reset successful");
          navigate("/login");
          setIsLoading(false);
        }
      } catch (e) {
        dialogs.error(`Error setting new password"  ${e}`);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
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
            Reset Password
          </div>
          <Formik
            initialValues={initalValues}
            validationSchema={validationScheme}
            onSubmit={(o) => {
              handleSubmit(o);
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
                    <DinoSpinner size={50} /> <br />
                  </div>
                </>
              )}
              <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`${colors.Buttons} p-3`}
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </ElementFrame>
      </div>
    </>
  );
}

export default PasswordRecoveryPage;
