import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError, colors } from "../Constants/Patterns";

import ElementFrame from "../Constructors/ElementFrame";

import { FcRemoveImage } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { CommentService } from "../Services/comment-service";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";

import { useCloudinary } from "../CustomHooks/useCloudinary";
import { FcAddImage } from "react-icons/fc";
import { ICommentDisplay } from "../Models/Interaction";
import { AxiosError } from "axios";
import { linkFieldValues, textFieldValues } from "../Models/FormikModels";
import DinoSpinner from "../Spinners/DinoSpinner";
import { isEqual } from "lodash";

interface EditCommentModalProps {
  Mshow: boolean;
  onHide: () => void;
  comment: ICommentDisplay;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  Mshow,
  onHide,
  comment,
}) => {
  const [show, setShow] = useState(Mshow);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();
  const [imageUrl, holdFile, setHoldFile, setImageURL, clear] = useCloudinary();
  const [CommentToEdit, setCommentToEdit] = useState(comment);
  const handleclose = () => {
    setCommentValues(CommentToEdit);
    onHide();
  };

  useEffect(() => {
    updateComment();
  }, [Mshow]);

  useEffect(() => {
    if (!isEqual(CommentToEdit, commentValues)) {
      setCommentValues(CommentToEdit);
    }
  }, [CommentToEdit]);

  const updateComment = async () => {
    const respons = await CommentService.GetCommentByID(comment.id);
    setCommentToEdit(respons.data);
  };
  const [commentValues, setCommentValues] = useState<ICommentDisplay>(
    CommentToEdit
  );
  const validationScheme = Yup.object({
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

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
        await postComment(commentValues);
      }
    } else {
      dialogs.error("Comment not sent user not logged in");
      setIsLoading(false);
      handleclose();
    }
  };

  useEffect(() => {
    const submitComment = async () => {
      if (imageUrl) {
        await postComment(commentValues);
      }
    };
    submitComment();
  }, [imageUrl]);

  const postComment = async (values: ICommentDisplay) => {
    if (loggedInContext.token) {
      console.log("Form submitted with values: ", values);
      setIsLoading(true);
      try {
        if (holdFile) {
          values.imageURL = imageUrl;
        }
        clear();
        console.log("Form submitted with values: ", values);
        const response = await CommentService.PutComment(values);
        console.log(response);
        dialogs.success("Comment Sent");
      } catch (error) {
        catchError(error as AxiosError, "Commenting");
      } finally {
        setCommentValues(commentValues);
        handleclose();
        setIsLoading(false);
      }
    } else {
      dialogs.error("Comment not sent user not logged in");
      setIsLoading(false);
      handleclose();
    }
  };
  const fieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: keyof ICommentDisplay
  ) => {
    setCommentValues((prevPostValues) => ({
      ...prevPostValues,
      [element]: e.target.value,
    }));
  };
  const handleRemoveImage = () => {
    setCommentValues((prevCommentValues) => ({
      ...prevCommentValues,
      imageURL: "",
    }));
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
                initialValues={commentValues}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="mt-1">
                    <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                      <div className="flex justify-evenly">
                        <label className="text-2xl font-bold  text-center">
                          Edit Comment
                        </label>
                      </div>
                    </div>
                    <FormikElementBuilder
                      {...textFieldValues}
                      value={`${commentValues.text}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        fieldChange(e, "text")
                      }
                    />

                    <FormikElementBuilder
                      {...linkFieldValues}
                      value={`${commentValues.link}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        fieldChange(e, "link")
                      }
                    />
                    <div className="font-semibold  flex justify-evenly items-center w-full mx-auto text-lg -mt-4">
                      <div className=" pb-4 pt-3">
                        <p>Image Upload</p>
                        <div
                          className={`flex items-center  p-2 mt-1 ${
                            commentValues.imageURL || holdFile
                              ? "pl-3"
                              : "pl-10"
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
                            {commentValues.imageURL || holdFile ? (
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
                )}
              </Formik>
            </>
          </ElementFrame>
        </>
      </Modal>
    </>
  );
};

export default EditCommentModal;
