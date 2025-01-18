import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";

import { useLogin } from "../CustomHooks/useLogin";
import { catchError, colors } from "../Constants/Patterns";

import ElementFrame from "../Constructors/ElementFrame";
import { INewComment } from "../Models/CommentModels";
import { FormikElementBuilder } from "../Constructors/FormikElementBuilder";
import { CommentService } from "../Services/comment-service";
import { useCloudinary } from "../CustomHooks/useCloudinary";

import { FcAddImage, FcEditImage, FcRemoveImage } from "react-icons/fc";
import { AxiosError } from "axios";
import { linkFieldValues, textFieldValues } from "../Models/FormikModels";
import DinoSpinner from "../Spinners/DinoSpinner";

interface AddCommentCommentModalProps {
  commentId: string;
  Mshow: boolean;
  onHide: () => void;
}
// modal to add comment to comment
const AddCommentCommentModal: React.FC<AddCommentCommentModalProps> = ({
  commentId,
  Mshow,
  onHide,
}) => {
  const [show, setShow] = useState(Mshow);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();

  const [imageUrl, holdFile, setHoldFile, setImageURL, clear] = useCloudinary();
  const linkValues = linkFieldValues;

  const handleclose = () => {
    setShow(false);
    onHide();
  };

  const validationScheme = Yup.object({
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

  const NewComment: INewComment = {
    id: "",
    link: "",
    imageURL: "",
    text: "",
    authorId: "",
    ParentPostId: "",
    ParentCommentId: commentId,
    Datetime: "",
  };

  const [commentValues, setCommentValues] = useState<INewComment>(NewComment);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setHoldFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (values: INewComment) => {
    setCommentValues(values);
    if (loggedInContext.token) {
      if (holdFile) {
        setImageURL(holdFile);
        setIsLoading(true);
      } else {
        await postComment(values);
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
        await postComment(commentValues);
      }
    };
    submitComment();
  }, [imageUrl]);

  const postComment = async (values: INewComment) => {
    if (loggedInContext.token) {
      setIsLoading(true);
      try {
        values.imageURL = imageUrl;
        clear();
        const response = await CommentService.PostComment(values);
        if (response.status == 200) {
          dialogs.success("Comment sent");
        }
      } catch (error) {
        catchError(error as AxiosError, "Commenting");
      } finally {
        setCommentValues(NewComment);
        handleclose();
        setIsLoading(false);
      }
    } else {
      dialogs.error("Comment not sent; user not logged in");
      setIsLoading(false);
      handleclose();
    }
  };
  useEffect(() => {
    setShow(Mshow);
  }, [Mshow]);
  const handleRemoveImage = () => {
    setCommentValues((prevCommentValues) => ({
      ...prevCommentValues,
      imageURL: "",
    }));
    clear();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} className="comment-modal">
        <>
          <ElementFrame tailwind="h-fit" width="300px" padding="1">
            <>
              <Formik
                initialValues={NewComment}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => (
                  <Form className="mt-1" onSubmit={handleSubmit}>
                    <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                      <div className="flex justify-evenly">
                        <label className="text-2xl font-bold  text-center">
                          Comment
                        </label>
                      </div>
                    </div>
                    <FormikElementBuilder {...textFieldValues} />
                    <FormikElementBuilder {...linkValues} />

                    <div className="font-semibold  flex justify-evenly items-center w-full mx-auto text-lg -mt-4">
                      <div className="pb-4 pt-3">
                        <p>Image Upload</p>
                        <div className="flex items-center pl-10 p-2 mt-1">
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

export default AddCommentCommentModal;
