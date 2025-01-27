import React, { useEffect, useState } from "react";
import { HiLink } from "react-icons/hi2";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import ElementFrame from "../../Constructors/ElementFrame";
import { dialogs } from "../../Constants/AlertsConstant";
import { TiDelete } from "react-icons/ti";
import { useUser } from "../../CustomHooks/useUser";
import { useLogin } from "../../CustomHooks/useLogin";
import { IPostDisplay } from "../../Models/Interaction";
import { CommentList } from "./CommentList";
import AddPostCommentModal from "../../Modals/AddPostCommentModal";
import { FaCommentMedical } from "react-icons/fa";
import {
  categories,
  colors,
  convertUTCToLocalTime,
  isValidURL,
} from "../../Constants/Patterns";
import { FaKey } from "react-icons/fa";
import EditPostModal from "../../Modals/EditPostModal";
import {
  MdEdit,
  MdExpand,
  MdOpenWith,
  MdOutlineCompress,
} from "react-icons/md";
import { Posts } from "../../Services/post-service";
import { useNavigate } from "react-router-dom";
import { ISocialGroupDisplay } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { useCopy } from "../../CustomHooks/useCopy";
import { MdOutlineContentCopy } from "react-icons/md";
import { Tooltip } from "react-bootstrap";
import { TbMobiledataOff } from "react-icons/tb";
import { IAppUserDisplay } from "../../Models/UserModels";
import { auth } from "../../Services/auth-service";

const PostView: React.FC<IPostDisplay> = (postDisplay) => {
  const copy = useCopy();
  const navagate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState<ISocialGroupDisplay | null>(null);
  const [groupAdminId, setGroupAdminId] = useState("");
  const [userInfo, setUserInfo] = useState<IAppUserDisplay | null>();
  const [postDisplayState, setPostDisplayState] = useState<IPostDisplay | null>(
    null
  );
  const [longText, setLongText] = useState({
    textLength: 0,
    OpenTextBox: false,
  });
  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const postAPI = Posts;
  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);

  const getPostAuther = async () => {
    const respons = await auth.getUser(postDisplay.authorId);
    setUserInfo(respons.data);
  };

  useEffect(() => {
    if (postDisplay) {
      setPostDisplayState(postDisplay);
      getPostAuther();
      getUpdatedPost();
      if (postDisplay.categoryId) {
        getCatName(postDisplay.categoryId);
      } else {
        setCatName("Uncategorized");
      }
    }
  }, []);

  const unvote = async () => {
    if (postDisplayState) {
      const respons = await Posts.unvotePost(postDisplayState.id);
      setPostDisplayState(respons.data);
    }
  };

  const handelImage = () => {
    if (postDisplayState) {
      dialogs.showImage("", postDisplayState.imageURL);
    }
  };
  const handleShowEdit = async () => {
    setShowEditModal((prevshowEditModal) => !prevshowEditModal);
    getPostAuther();
    getUpdatedPost();
  };

  const handleVote = async (vote: number) => {
    if (loginContex.token && postDisplayState) {
      const respons = await postAPI.VoteOnPost(postDisplayState.id, vote);
      setPostDisplayState(respons.data);
    }
  };
  const handleDelete = async () => {
    if (postDisplayState) {
      const respons = await Posts.DeletePost(postDisplayState.id);
      if (respons.status === 200) {
        setPostDisplayState(null);
      }
    }
  };

  const GoToUser = () => {
    if (postDisplayState) {
      navagate(`/profile?userId=${postDisplayState.authorId}`);
    }
  };

  const getGroupInfo = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setGroupInfo(response.data);
  };

  const getUpdatedPost = async () => {
    const response = await Posts.getPostById(postDisplay.id);
    setPostDisplayState(response.data);
  };

  useEffect(() => {
    if (postDisplayState && postDisplayState.groupId.length > 0) {
      getGroupInfo(postDisplayState.groupId);
    }
    if (groupInfo) {
      setGroupAdminId(groupInfo.adminId);
    }
  }, []);

  useEffect(() => {
    if (postDisplayState) {
      setLongText((prev) => ({
        ...prev,
        textLength: postDisplayState.text.length,
      }));
    }
  }, [postDisplayState]);

  const handleCopy = async (postId: string) => {
    await copy(postId);
  };

  const getCatName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setCatName(category.name);
    } else {
      setCatName("Uncategorized");
    }
  };

  const toggleExpandText = () => {
    const openBox = longText.OpenTextBox;
    setLongText((prev) => ({ ...prev, OpenTextBox: !openBox }));
  };

  return (
    <>
      {postDisplayState && (
        <>
          <ElementFrame
            tailwind="h-fit w-[350px] md:w-[400px]"
            padding="2 mt-2"
          >
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8"></div>
                  {userInfo && (
                    <img
                      className={`rounded-full h-10 w-10 shadow-2xl flex-shrink-0 `}
                      src={
                        isValidURL(userInfo.imageURL)
                          ? userInfo.imageURL
                          : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
                      }
                      onClick={() => GoToUser()}
                      aria-description={`Profile picture of ${userInfo.first_Name} ${userInfo.last_Name}`}
                    />
                  )}
                  <button
                    className=" text-sm font-bold"
                    onClick={() => GoToUser()}
                  >
                    {postDisplayState?.authorName}
                  </button>
                </div>
                {(postDisplayState?.authorId == userContext.userInfo.UserId ||
                  userContext.userInfo.IsAdmin == "true" ||
                  groupAdminId == userContext.userInfo.UserId) && (
                  <>
                    <div className="flex">
                      <div className="flex space-x-2">
                        <button
                          className="ml-auto mb-2"
                          onClick={handleShowEdit}
                        >
                          <MdEdit size={22} />
                        </button>

                        <EditPostModal
                          Mshow={showEditModal}
                          onHide={handleShowEdit}
                          post={postDisplayState}
                        />

                        <button className="ml-auto mb-2">
                          <TiDelete size={22} onClick={handleDelete} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-start">- {catName}</div>
              <div
                className=" font-bold flex justify-evenly"
                style={{
                  height: "25px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {postDisplayState?.title}
              </div>

              <div className="relative  " />
              <div className="flex justify-evenly ">
                {postDisplayState?.imageURL && (
                  <button className="" onClick={handelImage}>
                    <img
                      className={`h-56 ${
                        postDisplayState?.categoryId === 14 ||
                        postDisplayState?.categoryId === 13
                          ? `blur-xl`
                          : ``
                      } `}
                      src={postDisplayState.imageURL}
                    />
                  </button>
                )}
              </div>
              {(longText.textLength > 180 ||
                postDisplayState?.categoryId === 13) && (
                <div className="flex items-center justify-end p-1">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => toggleExpandText()}
                  >
                    {longText.OpenTextBox ? (
                      <Tooltip title="Shrink text">
                        <MdOutlineCompress size={22} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Expand text">
                        <MdExpand size={22} />
                      </Tooltip>
                    )}
                  </button>
                </div>
              )}
              <div className="p-0.5" />
              <div
                className={`${
                  colors.TextBox
                } dark:scrollbar-dark scrollbar-light text-wrap ${
                  postDisplayState?.categoryId === 13 && !longText.OpenTextBox
                    ? `h-0`
                    : longText.OpenTextBox
                    ? `h-fit`
                    : `h-20`
                }`}
                style={{
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {postDisplayState?.text}
              </div>
              <div
                className="flex pt-2 justify-between w-full"
                style={{ position: "sticky" }}
              >
                <div className="flex items-center">
                  {postDisplayState?.link && (
                    <button
                      className="pl-3"
                      onClick={() =>
                        window.open(postDisplayState.link, "_blank")
                      }
                    >
                      <HiLink size={22} />
                    </button>
                  )}
                  {postDisplayState.keyWords.length > 0 && (
                    <button
                      className="pl-3"
                      onClick={() =>
                        dialogs.showtext(postDisplayState.keyWords.toString())
                      }
                    >
                      <FaKey size={22} />
                    </button>
                  )}

                  <div className="flex items-center pl-3">
                    <button
                      className={`{rounded-md m-1 p-1 }`}
                      onClick={handleShow}
                    >
                      <FaCommentMedical
                        size={21}
                        aria-description="add comment"
                      />
                    </button>

                    <AddPostCommentModal
                      Mshow={showModal}
                      onHide={handleClose}
                      postId={postDisplayState.id}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Tooltip title="Open post seperatly">
                    <button
                      onClick={() =>
                        navagate(`/feed?postId=${postDisplayState.id}`)
                      }
                    >
                      <MdOpenWith size={24} />
                    </button>
                  </Tooltip>
                  <Tooltip title="Copy post link">
                    <button
                      onClick={() =>
                        handleCopy(postDisplayState ? postDisplayState.id : "")
                      }
                    >
                      <MdOutlineContentCopy size={24} />
                    </button>
                  </Tooltip>
                  {postDisplayState?.hasVoted && (
                    <button
                      onClick={() => {
                        unvote();
                      }}
                    >
                      <TbMobiledataOff size={24} className="ml-3 " />
                    </button>
                  )}
                  {!postDisplayState?.hasVoted && (
                    <>
                      <button
                        onClick={() => {
                          handleVote(1);
                        }}
                      >
                        <BiSolidUpvote size={20} />
                      </button>
                      <button
                        onClick={() => {
                          handleVote(-1);
                        }}
                      >
                        <BiSolidDownvote size={20} />
                      </button>
                    </>
                  )}
                  <div className="flex justify-evenly">
                    <div className="pl-4 pr-3 font-bold">
                      {postDisplayState?.totalVotes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={` font-bold ${colors.InteractionText} ml-16 -mt-2`}
              >
                {postDisplayState?.comments &&
                  postDisplayState.comments.length > 0 &&
                  postDisplayState.comments.length}
              </div>
              <div className="flex justify-end">
                {convertUTCToLocalTime(postDisplayState?.datetime, false)}
              </div>
            </div>
          </ElementFrame>

          <div className="-mt-8 relative z-10 ">
            <CommentList index={0} commmentList={postDisplayState?.comments} />
          </div>
        </>
      )}
    </>
  );
};

export default PostView;
