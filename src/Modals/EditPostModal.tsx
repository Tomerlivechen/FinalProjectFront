import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError, categories, colors } from "../Constants/Patterns";

import ElementFrame from "../Constructors/ElementFrame";

import { FcRemoveImage } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";

import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";

import { useCloudinary } from "../CustomHooks/useCloudinary";
import { FcAddImage } from "react-icons/fc";
import { IPostDisplay } from "../Models/Interaction";
import { Posts } from "../Services/post-service";
import { AxiosError } from "axios";
import {
  keyFieldValues,
  linkFieldValues,
  textFieldValues,
  titleFieldValues,
} from "../Models/FormikModels";
import DinoSpinner from "../Spinners/DinoSpinner";
import { isEqual } from "lodash";

interface EditPostModalProps {
  Mshow: boolean;
  onHide: () => void;
  post: IPostDisplay;
}
//modal to edit post
const EditPostModal: React.FC<EditPostModalProps> = ({
  Mshow,
  onHide,
  post,
}) => {
  const [show, setShow] = useState(Mshow);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();
  const [imageUrl, holdFile, setHoldFile, setImageURL, clear] = useCloudinary();
  const [PostToEdit, setPostToEdit] = useState<IPostDisplay>(post);
  const [catFilter, setCatFilter] = useState<number>(0);
  const [catName, setCatName] = useState("");

  const handleclose = () => {
    setPostValues(PostToEdit);
    onHide();
  };

  useEffect(() => {
    getUpdatedPost();
  }, [Mshow]);

  useEffect(() => {
    if (!isEqual(PostToEdit, postValues)) {
      setPostValues(PostToEdit);
    }
    if (PostToEdit.categoryId) {
      setCatFilter(PostToEdit.categoryId);
    }
  }, [PostToEdit]);

  const getUpdatedPost = async () => {
    const response = await Posts.getPostById(post.id);
    setPostToEdit(response.data);
    getCatName(response.data.categoryId);
  };

  const validationScheme = Yup.object({
    title: Yup.string().min(2).required("Must have a title"),
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

  const [postValues, setPostValues] = useState<IPostDisplay>(PostToEdit);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setHoldFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (loggedInContext.token) {
      if (holdFile) {
        setImageURL(holdFile);
        setIsLoading(true);
      } else {
        await postPost(postValues);
      }
    } else {
      dialogs.error("Comment not sent; user not logged in");
      setIsLoading(false);
      handleclose();
    }
  };

  useEffect(() => {
    const submitComment = async () => {
      if (imageUrl) {
        await postPost(postValues);
      }
    };
    submitComment();
  }, [imageUrl]);

  const postPost = async (values: IPostDisplay) => {
    if (loggedInContext.token) {
      setIsLoading(true);
      let updatedValues = { ...values };
      if (postValues.keyWords.length > 0) {
        const parsedKeyWords = processKeywords(postValues.keyWords.toString());
        updatedValues = { ...values, keyWords: parsedKeyWords };
      }
      if (holdFile) {
        updatedValues = { ...values, imageURL: imageUrl };
      }
      if (catFilter != updatedValues.categoryId) {
        updatedValues = { ...values, categoryId: catFilter };
      }
      try {
        clear();
        const response = await Posts.EditPost(updatedValues as IPostDisplay);
        if (response.status === 200) {
          dialogs.success("Post updated successfully");
        }
      } catch (error) {
        catchError(error as AxiosError, "Post updating");
      } finally {
        setPostValues(postValues);
        handleclose();
        setIsLoading(false);
      }
    } else {
      dialogs.error("Post not sent; user not logged in");
      setIsLoading(false);
      handleclose();
    }
  };

  const delimiters = /[,;|\s]+/;
  const processKeywords = (keywords: string): string[] => {
    const splitKeywords = keywords.split(delimiters).map((word) => word.trim());
    const capitalizedKeywords = splitKeywords.map((word) => capitalize(word));
    return capitalizedKeywords;
  };
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  const handleRemoveImage = () => {
    setPostValues((prevPostValues) => ({ ...prevPostValues, imageURL: "" }));
    clear();
  };

  const fieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: keyof IPostDisplay
  ) => {
    setPostValues((prevPostValues) => ({
      ...prevPostValues,
      [element]: e.target.value,
    }));
  };

  const getCatName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setCatName(category.name);
    } else {
      setCatName("Uncategorized");
    }
  };

  useEffect(() => {
    setShow(Mshow);
  }, [Mshow]);
  return (
    <>
      <Modal show={show} onHide={handleclose} className="comment-modal">
        <>
          <ElementFrame tailwind="h-fit" width="300px" padding="1">
            <>
              <Formik
                initialValues={postValues}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
              >
                <Form className="mt-1">
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                    <div className="flex justify-evenly">
                      <label className="text-2xl font-bold  text-center">
                        Edit Post
                      </label>
                    </div>
                  </div>
                  <FormikElementBuilder
                    {...titleFieldValues}
                    value={`${postValues.title}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "title")
                    }
                  />
                  <FormikElementBuilder
                    {...keyFieldValues}
                    value={`${postValues.keyWords}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "keyWords")
                    }
                  />
                  <FormikElementBuilder
                    {...linkFieldValues}
                    value={`${postValues.link}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "link")
                    }
                  />
                  <FormikElementBuilder
                    {...textFieldValues}
                    value={`${postValues.text}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fieldChange(e, "text")
                    }
                  />
                  <select
                    className={`rounded-md border-1 px-2 py-2  ${colors.ElementFrame} font-bold w-[18rem]  my-1 `}
                    id="category"
                    name="category"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCatFilter(Number(e.target.value))
                    }
                  >
                    <option
                      value={postValues.categoryId}
                      className={`${colors.ElementFrame} font-bold`}
                    >
                      {catName}
                    </option>
                    {categories.map((category) => (
                      <option
                        className={`${colors.ElementFrame} font-bold`}
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <div className="font-semibold  flex justify-evenly items-center w-full mx-auto text-lg -mt-4">
                    <div className=" pb-4 pt-3">
                      <p>Image Upload</p>
                      <div
                        className={`flex items-center  p-2 mt-1 ${
                          postValues.imageURL || holdFile ? "pl-3" : "pl-10"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          id="file-input"
                          hidden
                        />
                        <div className="flex justify-evenly">
                          {postValues.imageURL || holdFile ? (
                            <>
                              <FcEditImage
                                onClick={() => {
                                  const fileInput = document.getElementById(
                                    "file-input"
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
                                onClick={handleRemoveImage}
                              />
                            </>
                          ) : (
                            <FcAddImage
                              onClick={() => {
                                const fileInput = document.getElementById(
                                  "file-input"
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
                  </div>
                  {isLoading && (
                    <>
                      <div className=" flex flex-col items-center">
                        <DinoSpinner size={30} />
                      </div>
                    </>
                  )}
                  <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-full mx-auto text-lg -m-3">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={` font-bold ${colors.Buttons}`}
                    >
                      Submit
                    </button>
                    <button
                      disabled={isLoading}
                      type="button"
                      onClick={handleclose}
                      className={` font-bold ${colors.Buttons}`}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          </ElementFrame>
        </>
      </Modal>
    </>
  );
};

export default EditPostModal;
