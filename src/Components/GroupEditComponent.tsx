import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ISocialGroupDisplay, ISocialGroupEdit } from "../Models/SocialGroup";
import { Groups } from "../Services/group-service";
import { useCloudinary } from "../CustomHooks/useCloudinary";
import * as Yup from "yup";
import ElementFrame from "../Constructors/ElementFrame";
import { Form, Formik } from "formik";
import { colors } from "../Constants/Patterns";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";
import { FcAddImage, FcEditImage, FcRemoveImage } from "react-icons/fc";
import {
  GroupDescriptionValues,
  GroupNameValues,
  GroupNewAdminEmailValues,
  GroupRulesValues,
} from "../Models/FormikModels";
import { isEqual } from "lodash";

const GroupEditComponent = () => {
  const [searchParams] = useSearchParams();
  const [groupId, setGroupId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setGroupId(_groupId);
    } else {
      setGroupId(null);
    }
  };

  const [newGroupData, setNewGroupData] = useState<ISocialGroupEdit | null>(
    null
  );
  const [
    initialGroupData,
    setInitialGroupData,
  ] = useState<ISocialGroupDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [subbmiting, setSubbmiting] = useState(false);

  const getGroupDisplay = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setInitialGroupData(response.data);
  };

  const toggleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: keyof ISocialGroupEdit
  ) => {
    setNewGroupData((prev) => ({ ...prev, [element]: e.target.value }));
  };
  const [
    imageUrl,
    imageFile,
    holdImageFile,
    setImageURL,
    clear,
  ] = useCloudinary();
  const [
    bannerImageUrl,
    bannerFile,
    holdBannerFile,
    setBannerImageURL,
    clearBanner,
  ] = useCloudinary();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId) {
      getGroupDisplay(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    if (newGroupData) {
      setLoading(false);
    } else {
      if (initialGroupData) {
        setNewGroupData({
          id: initialGroupData.id,
          name: initialGroupData.name,
          description: initialGroupData.description,
          banerImageURL: initialGroupData.banerImageURL,
          imageURL: initialGroupData.imageURL,
          groupRules: initialGroupData.groupRules,
          newAdminEmail: "",
        });
      }
    }
  }, [newGroupData, groupId, initialGroupData]);

  const initializeGroupData = () => {
    if (initialGroupData) {
      setNewGroupData({
        id: initialGroupData.id,
        name: initialGroupData.name,
        description: initialGroupData.description,
        banerImageURL: initialGroupData.banerImageURL,
        imageURL: initialGroupData.imageURL,
        groupRules: initialGroupData.groupRules,
        newAdminEmail: "",
      });
    }
  };

  const validationScheme = Yup.object({
    name: Yup.string().min(2).required("The group name is required"),
    description: Yup.string()
      .min(2)
      .required("The group description is required"),
  });

  const handleRemoveImage = () => {
    setNewGroupData((prevUserValues) => ({ ...prevUserValues, imageURL: "" }));
    clear();
  };

  const handleRemoveBannerImage = () => {
    setNewGroupData((prevUserValues) => ({
      ...prevUserValues,
      banerImageURL: "",
    }));
    clearBanner();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      holdImageFile(event.target.files[0]);
    }
  };
  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      holdBannerFile(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    setSubbmiting(true);
    if (imageFile || bannerFile) {
      if (imageFile) {
        await setImageURL(imageFile).then(() =>
          setNewGroupData((prev) => ({
            ...prev,
            imageURL: imageUrl,
          }))
        );
      }

      if (bannerFile) {
        await setBannerImageURL(bannerFile).then(() =>
          setNewGroupData((prev) => ({
            ...prev,
            banerImageURL: bannerImageUrl,
          }))
        );
      }
    } else {
      updateGroup();
    }
  };

  useEffect(() => {
    if (
      (imageFile && imageUrl && bannerFile && bannerImageUrl) ||
      (!imageFile && !imageUrl && bannerFile && bannerImageUrl) ||
      (imageFile && imageUrl && !bannerFile && !bannerImageUrl)
    ) {
      updateGroup();
    }
  }, [bannerFile, bannerImageUrl, imageFile, imageUrl]);

  const updateGroup = async () => {
    if (newGroupData) {
      const updateGroupData = newGroupData;
      if (imageUrl) {
        updateGroupData.imageURL = imageUrl;
      }
      if (bannerImageUrl) {
        updateGroupData.banerImageURL = bannerImageUrl;
      }
      await Groups.EditGroup(updateGroupData);
      navigate(`/group?groupId=${groupId}`);
    } else {
      initializeGroupData();
    }
    setSubbmiting(false);
  };

  return (
    <>
      {!loading && newGroupData && (
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
              Group Settings
            </div>
            <Formik
              initialValues={newGroupData}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              <Form className="mt-5">
                <div className="flex flex-wrap justify-between">
                  <div className="w-1/2 pr-2 pl-2">
                    <FormikElementBuilder
                      {...GroupNameValues}
                      value={newGroupData.name}
                      onChange={(e) => toggleChange(e, "name")}
                    />
                  </div>
                  <div className="w-1/2 pl-2 pr-2">
                    <FormikElementBuilder
                      {...GroupDescriptionValues}
                      value={newGroupData.description}
                      onChange={(e) => toggleChange(e, "description")}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center  p-2 mt-1 ${
                    newGroupData.imageURL || imageFile ? "pl-3" : "pl-10"
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

                <div className="flex flex-wrap justify-center">
                  <div className="w-1/2 pr-2 pl-2">
                    <p>Profile Picture</p>

                    <div className="flex space-x-4 justify-center">
                      {newGroupData.imageURL || imageFile ? (
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
                    <div className="flex space-x-4 justify-center">
                      {newGroupData.banerImageURL || bannerFile ? (
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
                <div className="flex flex-wrap justify-center">
                  <div className="w-full pr-2 pl-2">
                    <FormikElementBuilder
                      {...GroupRulesValues}
                      value={newGroupData.groupRules}
                      onChange={(e) => toggleChange(e, "groupRules")}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div className="w-1/2 pr-2 pl-2">
                    <FormikElementBuilder
                      {...GroupNewAdminEmailValues}
                      value={newGroupData.newAdminEmail}
                      onChange={(e) => toggleChange(e, "newAdminEmail")}
                    />
                  </div>
                </div>
                <div className="font-bold rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <button
                    disabled={subbmiting}
                    type="submit"
                    onClick={() => console.log("click")}
                    className={`${colors.Buttons} p-3`}
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </ElementFrame>
        </div>
      )}
    </>
  );
};

export { GroupEditComponent };
