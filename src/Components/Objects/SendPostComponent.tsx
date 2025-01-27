import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { dialogs } from "../../Constants/AlertsConstant";
import { INewPost } from "../../Models/Interaction";
import { Posts } from "../../Services/post-service";
import { useLogin } from "../../CustomHooks/useLogin";
import { catchError, categories, colors } from "../../Constants/Patterns";
import { HiLink } from "react-icons/hi2";

import ElementFrame from "../../Constructors/ElementFrame";
import { useCloudinary } from "../../CustomHooks/useCloudinary";
import { FcAddImage, FcEditImage, FcRemoveImage } from "react-icons/fc";
import { useLocation, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { isEqual } from "lodash";
import DinoSpinner from "../../Spinners/DinoSpinner";

function SendPostComponent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [groupIdState, setGroupIdState] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();
  const [Url, setUrl] = useState("");

  const [groupId, setGroupId] = useState<null | string>(null);

  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setGroupId(_groupId);
    } else {
      setGroupId(null);
    }
  };

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const [imageUrl, holdFile, setHoldFile, setImageURL, clear] = useCloudinary();
  const toggelOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const validationScheme = Yup.object({
    title: Yup.string().required("A title is required").min(2).max(55),
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

  const handelAddUrl = async () => {
    const getUrl = await dialogs.getURL("Link", "Enter the URL");
    setUrl(getUrl);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/group") && groupId) {
      setGroupIdState(groupId);
    }
  }, [groupId, searchParams]);

  const NewPost: INewPost = {
    id: "",
    title: "",
    link: "",
    imageURL: "",
    text: "",
    authorId: "",
    categoryId: 1,
    group: groupIdState ?? "",
    keyWords: "",
    datetime: "",
  };

  const [postValues, setPostValues] = useState<INewPost>(NewPost);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setHoldFile(event.target.files[0]);
    }
  };

  // make sure images are sent to coldery before sending a post
  const handleSubmit = async (values: INewPost) => {
    setPostValues(values);
    if (loggedInContext.token) {
      if (holdFile) {
        setImageURL(holdFile);
        setIsLoading(true);
      } else {
        await postPost(values);
      }
    } else {
      dialogs.error("Comment not sent; user not logged in");
      setIsLoading(false);
    }
  };

  // once images are saved and a link is receved send the post to backend
  useEffect(() => {
    const submitPost = async () => {
      if (imageUrl) {
        await postPost(postValues);
      }
    };
    submitPost();
  }, [imageUrl]);

  // send the post to backend fill in the vlaues the formik has troble with
  const postPost = async (values: INewPost) => {
    if (loggedInContext.token) {
      setIsLoading(true);
      try {
        values.link = Url;
        values.imageURL = imageUrl;
        clear();
        const response = await Posts.postPost(values);
        if (response.status === 200) {
          dialogs.success("Post Sent");
        }
      } catch (error) {
        catchError(error as AxiosError, "Posting");
      } finally {
        setPostValues(NewPost);
        setIsLoading(false);
        toggelOpen();
      }
    } else {
      dialogs.error("Post not sent; user not logged in");
      setIsLoading(false);
      toggelOpen();
    }
  };

  const handleRemoveImage = () => {
    setPostValues((prevPostValues) => ({
      ...prevPostValues,
      imageURL: "",
    }));
    clear();
  };

  return (
    <>
      {open ? (
        <>
          <ElementFrame
            height="auto"
            padding="1"
            tailwind="md:w-[400px] w-[370px]"
          >
            <Formik
              initialValues={NewPost}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form className="mt-1" onSubmit={handleSubmit}>
                  <div className="font-extralight form-group flex flex-col gap-2 md:w-[400px] w-[370px] mx-auto text-lg mt-1">
                    <div className="flex justify-evenly">
                      <label className="text-4xl font-bold  text-center">
                        New Post
                      </label>
                      <button
                        className={`rounded-md  m-1 p-1 ${colors.Buttons}`}
                        onClick={toggelOpen}
                      >
                        {open ? "Close" : "Write"}
                      </button>
                    </div>

                    <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                      <Field
                        className={`rounded-md hover:border-2 border-2 px-2 py-2 md:mx-1 mx-4  ${colors.TextBox}`}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        required
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <Field
                      className={`rounded-md hover:border-2 border-2 px-2 py-2 md:mx-1 mx-4  ${colors.TextBox}`}
                      id="text"
                      name="text"
                      type="text"
                      placeholder="Text"
                      as="textarea"
                      style={{
                        height: "150px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        resize: "none",
                      }}
                      required
                    />
                    <ErrorMessage
                      name="text"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                    <Field
                      className={`rounded-md hover:border-2 border-2 px-2 py-2 md:mx-1 mx-4  ${colors.TextBox}`}
                      id="keyWords"
                      name="keyWords"
                      type="text"
                      placeholder="Key Words"
                    />

                    <ErrorMessage
                      name="keyWords"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-extralight form-group flex justify-between gap-8 w-1/2 mx-auto text-lg mt-1 ">
                    <label
                      htmlFor="categoryId"
                      className="font-bold pt-2 -ml-8 "
                    >
                      Category:
                    </label>
                    <Field
                      className={`rounded-md hover:border-2 border-2 px-2 py-2  ${colors.TextBox}`}
                      id="categoryId"
                      name="categoryId"
                      as="select"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2"
                      id="link"
                      name="link"
                      type="hidden"
                      value={Url}
                      placeholder="Link"
                    />

                    <ErrorMessage
                      name="link"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2"
                      id="imageURL"
                      name="imageURL"
                      type="hidden"
                      placeholder="imageURL"
                    />

                    <ErrorMessage
                      name="imageURL"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-semibold flex justify-evenly items-center w-full mx-auto text-lg ">
                    <div className="h-28 w-28 p-4">
                      Add Link
                      <button
                        type="button"
                        className="pl-6 pt-3"
                        onClick={handelAddUrl}
                      >
                        <HiLink style={{ fontSize: "35px" }} />
                      </button>
                    </div>
                    <div className="pl-10">
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
                        <br />
                      </div>
                    </>
                  )}
                  <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-full mx-auto text-lg ">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`${colors.Buttons} font-bold p-1`}
                    >
                      Post
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </ElementFrame>
        </>
      ) : (
        <>
          <ElementFrame
            height="55px"
            tailwind="md:w-[400px] w-[370px]"
            padding="1"
          >
            <div className="flex justify-evenly">
              <label className="text-4xl font-bold  mb-1 ">New Post</label>
              <button
                className={`rounded-md  m-1 p-1  ${colors.Buttons} 
                `}
                onClick={toggelOpen}
              >
                {open ? "Close" : "Create"}
              </button>
            </div>
          </ElementFrame>
        </>
      )}
    </>
  );
}

export default SendPostComponent;
