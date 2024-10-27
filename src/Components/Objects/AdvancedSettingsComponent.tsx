import { useEffect, useState } from "react";
import { IAppUserEdit, IEditUser } from "../../Models/UserModels";
import ElementFrame from "../../Constructors/ElementFrame";
import { FormikElementBuilder } from "../../Constructors/FormikElementBuilder";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { colors } from "../../Constants/Patterns";
import { useUser } from "../../CustomHooks/useUser";
import { auth } from "../../Services/auth-service";
import { AdvancedSettingsComponentProps } from "../../Types/@UserTypes";
import {
  confirmPasswordValues,
  newPasswordValues,
  oldPasswordValues,
} from "../../Models/FormikModels";

const AdvancedSettingsComponent: React.FC<AdvancedSettingsComponentProps> = (
  props
) => {
  const { userToEdit, show } = props;
  const [open, setOpen] = useState(show);
  const [viewPassword, setviewPassword] = useState("password");
  newPasswordValues.type = viewPassword;
  confirmPasswordValues.type = viewPassword;
  oldPasswordValues.type = viewPassword;
  const userContex = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const viewPass = () => {
    setviewPassword((prevviewPassword) =>
      prevviewPassword === "password" ? "text" : "password"
    );
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);
  const validationScheme = Yup.object({
    oldPassword: Yup.string()
      .min(8)
      .max(30)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    newPassword: Yup.string()
      .min(8)
      .max(30)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Must match password"
    ),
    permissionLevel: Yup.string()
      .required("Please select an option")
      .notOneOf([""], "Please select a valid option"),
  });
  const handleClick = () => {
    console.log("Button clicked");
  };

  const userValues: IEditUser = {
    oldPassword: "",
    newPassword: "",
    permissionLevel: userContex.userInfo.PermissionLevel ?? "",
  };

  const handleSubmit = async (values: IEditUser) => {
    setIsLoading(true);
    console.log("Form submitted with values: ", values);
    handleClick();
    const AdvancedUserEdit: IAppUserEdit = {
      id: userToEdit.id,
      userName: userToEdit.userName,
      oldPassword: values.oldPassword ? values.oldPassword : "",
      newPassword: values.newPassword ? values.newPassword : "",
      bio: userToEdit.bio,
      prefix: userToEdit.prefix,
      hideEmail: userToEdit.hideEmail,
      hideName: userToEdit.hideName,
      hideBlocked: userToEdit.hideBlocked,
      banerImageURL: userToEdit.banerImageURL,
      first_Name: userToEdit.first_Name,
      last_Name: userToEdit.last_Name,
      pronouns: userToEdit.pronouns,
      imageURL: userToEdit.imageURL,
      permissionLevel: values.permissionLevel
        ? values.permissionLevel
        : userToEdit.permissionLevel,
    };
    await auth.manage(AdvancedUserEdit);
    setIsLoading(false);
  };

  return (
    <>
      {open && (
        <>
          <ElementFrame height="350xp" width="700xp" padding="2">
            <Formik
              initialValues={userValues}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              <Form className="mt-5">
                <div>
                  <div className="flex flex-wrap justify-between">
                    <div className="w-3/12 pl-2 pr-2">
                      <FormikElementBuilder {...oldPasswordValues} />
                    </div>
                    <div className="w-1/12  mt-6 -ml-16 ">
                      {viewPassword == "text" ? (
                        <FaRegEye size={25} onClick={viewPass} />
                      ) : (
                        <RxEyeClosed size={25} onClick={viewPass} />
                      )}
                    </div>
                    <div className="w-4/12 pl-2 pr-2">
                      <FormikElementBuilder {...newPasswordValues} />
                    </div>
                    <div className="w-3/12 pr-2">
                      <FormikElementBuilder {...confirmPasswordValues} />
                    </div>
                  </div>
                </div>
                <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <label htmlFor="premissionLevel">User Type</label>
                  <Field
                    className={`rounded-md hover:border-2 border-2 px-2 py-2 ${colors.ElementFrame}`}
                    id="permissionLevel"
                    name="permissionLevel"
                    as="select"
                  >
                    <option value="">Select a user type</option>
                    <option value="User">Basic User</option>
                    <option value="PowerUser">Power User</option>
                  </Field>
                  <ErrorMessage
                    name="permissionLevel"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <button
                    disabled={isLoading}
                    type="submit"
                    onClick={() => console.log("click")}
                    className={`${colors.Buttons} p-3`}
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </ElementFrame>{" "}
        </>
      )}
    </>
  );
};

export { AdvancedSettingsComponent };
