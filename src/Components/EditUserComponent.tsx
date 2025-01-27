import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ElementFrame from "../Constructors/ElementFrame";
import { catchError, colors } from "../Constants/Patterns";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";

import { FcAddImage, FcEditImage, FcRemoveImage } from "react-icons/fc";
import { IAppUserDisplay, IAppUserEdit } from "../Models/UserModels";
import { useLogin } from "../CustomHooks/useLogin";
import { useCloudinary } from "../CustomHooks/useCloudinary";
import { useUser } from "../CustomHooks/useUser";
import { FcKey } from "react-icons/fc";
import { AdvancedSettingsComponent } from "./Objects/AdvancedSettingsComponent";
import { AxiosError } from "axios";
import {
  bioValues,
  emailValues,
  firstNameValues,
  lastNameValues,
  prefixValues,
  pronounsValues,
  userNameValues,
} from "../Models/FormikModels";
import { AdvancedSettingsComponentProps } from "../Types/@UserTypes";
import DinoSpinner from "../Spinners/DinoSpinner";

const EditUserComponent: React.FC<{ userInfo: IAppUserDisplay }> = ({
  userInfo,
}) => {
  const userContext = useUser();
  const [emailValue, setEmailValue] = useState("");

  const initalValues: IAppUserEdit = {
    userName: "",
    prefix: "",
    first_Name: "",
    last_Name: "",
    pronouns: "",
    imageURL: "",
    id: "",
    bio: "",
    banerImageURL: "",
    hideEmail: false,
    hideName: false,
    hideBlocked: false,
    oldPassword: "",
    newPassword: "",
    permissionLevel: "",
  };
  useEffect(() => {
    if (userInfo && userContext.userInfo.PermissionLevel) {
      const userinfuValues: IAppUserEdit = {
        userName: userInfo.userName,
        prefix: userInfo.prefix,
        first_Name: userInfo.first_Name,
        last_Name: userInfo.last_Name,
        pronouns: userInfo.pronouns,
        imageURL: userInfo.imageURL,
        id: userInfo.id,
        bio: userInfo.bio,
        banerImageURL: userInfo.banerImageURL,
        hideEmail: userInfo.hideEmail,
        hideName: userInfo.hideName,
        hideBlocked: userInfo.hideBlocked,
        oldPassword: "",
        newPassword: "",
        permissionLevel: userContext.userInfo.PermissionLevel,
      };
      setBoolValues({
        hideEmail: userInfo.hideEmail,
        hideName: userInfo.hideName,
        hideBlocked: userInfo.hideBlocked,
      });

      setEmailValue(userInfo.email);
      setUserValues(userinfuValues);
    }
  }, [userInfo]);
  const [advanced, setAdvanced] = useState<AdvancedSettingsComponentProps>({
    userToEdit: initalValues,
    show: false,
  });
  const [userValues, setUserValues] = useState<IAppUserEdit>(initalValues);
  const [boolValues, setBoolValues] = useState({
    hideEmail: false,
    hideName: false,
    hideBlocked: false,
  });

  const [
    imageUrl,
    HoldImage,
    setHoldImage,
    setImageURL,
    clear,
  ] = useCloudinary();
  const [
    bannerImageUrl,
    HoldBanner,
    setHoldBanner,
    setbannerImageURL,
    clearbanner,
  ] = useCloudinary();
  const LoggedInContext = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleAdvanced = () => {
    setAdvanced((prevAdvanced) => ({
      ...prevAdvanced,
      show: !prevAdvanced.show,
      userToEdit: userValues,
    }));
  };

  const validationScheme = Yup.object({
    userName: Yup.string().min(2).max(25),
    prefix: Yup.string().min(2).max(5),
    first_Name: Yup.string().min(2).max(25),
    last_Name: Yup.string().min(2).max(30),
    pronouns: Yup.string().min(2).max(10),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setHoldImage(event.target.files[0]);
    }
  };
  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setHoldBanner(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (LoggedInContext.token) {
      if (HoldImage || HoldBanner) {
        if (HoldImage) {
          await setImageURL(HoldImage).then(() => {
            setUserValues((prevUserValues) => ({
              ...prevUserValues,
              imageURL: imageUrl,
            }));
          });
        }
        if (HoldBanner) {
          await setbannerImageURL(HoldBanner).then(() =>
            setUserValues((prevUserValues) => ({
              ...prevUserValues,
              banerImageURL: bannerImageUrl,
            }))
          );
        }
        setIsLoading(true);
      } else {
        await PutUser(userValues);
      }
    } else {
      dialogs.error("Comment not sent; user not logged in");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const submitUser = async () => {
      if (
        (HoldImage && imageUrl && HoldBanner && bannerImageUrl) ||
        (HoldImage && imageUrl && !HoldBanner && !bannerImageUrl) ||
        (!HoldImage && !imageUrl && HoldBanner && bannerImageUrl)
      ) {
        await PutUser(userValues);
      }
    };
    submitUser();
  }, [bannerImageUrl, imageUrl]);

  const PutUser = async (values: IAppUserEdit) => {
    if (LoggedInContext.token) {
      setIsLoading(true);
      try {
        if (HoldImage) {
          values.imageURL = imageUrl;
        }
        if (HoldBanner) {
          values.banerImageURL = bannerImageUrl;
        }
        values.hideBlocked = boolValues.hideBlocked;
        values.hideEmail = boolValues.hideEmail;
        values.hideName = boolValues.hideName;
        clear();
        clearbanner();

        const response = await auth.manage(values);
        if (response.status === 200) {
          dialogs.success("Updated info");
        }
      } catch (error) {
        catchError(error as AxiosError, "Updating info");
      } finally {
        setUserValues(userValues);
        setIsLoading(false);
        navigate(`/profile?userId=${values.id}`);
      }
    } else {
      dialogs.error("Comment not sent; user not logged in");
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setUserValues((prevUserValues) => ({ ...prevUserValues, imageURL: "" }));
  };
  const handleRemoveBannerImage = () => {
    setUserValues((prevUserValues) => ({
      ...prevUserValues,
      banerImageURL: "",
    }));
  };

  const fieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: keyof IAppUserEdit
  ) => {
    setUserValues((prevUserValues) => ({
      ...prevUserValues,
      [element]: e.target.value,
    }));
  };

  const boolChange = (element: "hideEmail" | "hideName" | "hideBlocked") => {
    setBoolValues((prevBoolValues) => ({
      ...prevBoolValues,
      [element]: !prevBoolValues[element],
    }));
  };

  return (
    <>
      <div className="flex justify-center">
        <ElementFrame
          height="800px"
          tailwind="md:w-[700px] w-350"
          overflowY="auto"
          padding="0 pb-4"
        >
          <div
            className={`text-4xl font-bold  text-center ${colors.ButtonFont}`}
          >
            User Settings
          </div>
          <Formik
            initialValues={userValues}
            validationSchema={validationScheme}
            onSubmit={handleSubmit}
          >
            <Form className="mt-5">
              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...emailValues} value={emailValue} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder
                    {...userNameValues}
                    value={userValues.userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "userName")
                    }
                  />
                </div>
              </div>

              <div
                className={`flex items-center  p-2 mt-1 ${
                  userValues.imageURL || HoldImage ? "pl-3" : "pl-10"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-input"
                  hidden
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  id="banner-input"
                  hidden
                />
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <p>Profile Picture</p>

                  <div className="flex space-x-4">
                    {userValues.imageURL || HoldImage ? (
                      <>
                        <FcEditImage
                          onClick={() => {
                            const fileInput = document.getElementById(
                              "image-input"
                            );
                            if (fileInput) {
                              fileInput.click();
                            }
                          }}
                          size={40}
                          className="cursor-pointer "
                        />

                        <FcRemoveImage
                          size={40}
                          className="cursor-pointer "
                          onClick={handleRemoveImage}
                        />
                      </>
                    ) : (
                      <FcAddImage
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "image-input"
                          );
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        size={40}
                        className="cursor-pointer "
                      />
                    )}
                  </div>
                </div>

                <div className="w-1/2 pl-2 pr-2">
                  <p>Banner Picture</p>
                  <div className="flex space-x-4">
                    {userValues.banerImageURL || HoldBanner ? (
                      <>
                        <FcEditImage
                          onClick={() => {
                            const fileInput = document.getElementById(
                              "banner-input"
                            );
                            if (fileInput) {
                              fileInput.click();
                            }
                          }}
                          size={40}
                          className="cursor-pointer"
                        />

                        <FcRemoveImage
                          size={40}
                          className="cursor-pointer"
                          onClick={handleRemoveBannerImage}
                        />
                      </>
                    ) : (
                      <FcAddImage
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "banner-input"
                          );
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        size={40}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder
                    {...prefixValues}
                    value={userValues.prefix}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "prefix")
                    }
                  />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder
                    {...firstNameValues}
                    value={userValues.first_Name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "first_Name")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder
                    {...lastNameValues}
                    value={userValues.last_Name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "last_Name")
                    }
                  />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder
                    {...pronounsValues}
                    value={userValues.pronouns}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "pronouns")
                    }
                  />
                </div>
              </div>
              <div className="flex w-full ">
                <div className=" w-full pl-2 pr-2">
                  <FormikElementBuilder
                    {...bioValues}
                    value={userValues.bio}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "bio")
                    }
                  />
                </div>{" "}
              </div>

              <div className="flex flex-wrap justify-between mt-5">
                <div className="w-1/3 pr-2 pl-2 flex flex-col items-center">
                  <label className="mb-2">Hide Email</label>
                  <Field
                    type="checkbox"
                    name="hideEmail"
                    className="form-checkbox"
                    checked={boolValues.hideEmail}
                    onClick={() => boolChange("hideEmail")}
                  />
                </div>

                <div className="w-1/3 pr-2 pl-2 flex flex-col items-center">
                  <label className="mb-2">Hide Name</label>
                  <Field
                    type="checkbox"
                    name="hideName"
                    className="form-checkbox"
                    checked={boolValues.hideName}
                    onClick={() => boolChange("hideName")}
                  />
                </div>

                <div className="w-1/3 pr-2 pl-2 flex flex-col items-center">
                  <label className="mb-2">Hide when Blocked</label>
                  <Field
                    type="checkbox"
                    name="hideBlocked"
                    className="form-checkbox"
                    checked={boolValues.hideBlocked}
                    onClick={() => boolChange("hideBlocked")}
                  />
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
                  Save
                </button>
              </div>
            </Form>
          </Formik>
          <div className="flex flex-wrap justify-between mt-5">
            <div className="w-2/3 pr-2 pl-2 flex flex-col items-center"></div>
            <div className="w-1/3 pr-2 pl-2 flex flex-col items-center">
              <label className="mb-2">Advanced settings</label>
              <div className="flex space-x-4">
                <button onClick={toggleAdvanced}>
                  <FcKey size={40} className="cursor-pointer " />
                </button>
              </div>
            </div>
          </div>
        </ElementFrame>
      </div>
      <div className="flex  justify-center  ">
        <div className="justify-center m-1 " />
        <AdvancedSettingsComponent {...advanced} />
      </div>
    </>
  );
};

export default EditUserComponent;
