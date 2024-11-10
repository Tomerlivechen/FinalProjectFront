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
import { colors } from "../../Constants/Patterns";
import { FaKey } from "react-icons/fa";
import EditPostModal from "../../Modals/EditPostModal";
import { MdEdit } from "react-icons/md";
import { Posts } from "../../Services/post-service";
import { useNavigate } from "react-router-dom";
import { ISocialGroupDisplay } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { useCopy } from "../../CustomHooks/useCopy";
import { MdOutlineContentCopy } from "react-icons/md";
import { Tooltip } from "react-bootstrap";

const PostView: React.FC<IPostDisplay> = (postDisplay) => {
  const copy = useCopy();
  const navagate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState<ISocialGroupDisplay | null>(null);
  const [groupAdminId, setGroupAdminId] = useState("");
  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);

  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const postAPI = Posts;
  const handelImage = () => {
    dialogs.showImage("", postDisplay.imageURL);
  };
  const handleShowEdit = () =>
    setShowEditModal((prevshowEditModal) => !prevshowEditModal);
  const handleVote = async (vote: number) => {
    if (loginContex.token) {
      await postAPI.VoteOnPost(postDisplay.id, vote);
      postDisplay.hasVoted = true;
      postDisplay.totalVotes += vote;
    }
  };
  const handleDelete = () => Posts.DeletePost(postDisplay.id);

  const GoToUser = () => {
    navagate(`/profile?userId=${postDisplay.authorId}`);
  };

  const getGroupInfo = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setGroupInfo(response.data);
  };

  useEffect(() => {
    if (postDisplay && postDisplay.groupId.length > 0) {
      getGroupInfo(postDisplay.groupId);
    }
    if (groupInfo) {
      setGroupAdminId(groupInfo.adminId);
    }
  }, []);

  const handleCopy = async (postId: string) => {
    await copy(postId);
  };

  return (
    <>
      <ElementFrame
        height={`${postDisplay.imageURL ? "450px" : "230px"}`}
        width="400px"
        padding="2 mt-2"
      >
        <div>
          <div className="flex justify-between items-center">
            <button
              className=" text-sm font-bold pl-10"
              onClick={() => GoToUser()}
            >
              {postDisplay.authorName}
            </button>
            {(postDisplay.authorId == userContext.userInfo.UserId ||
              userContext.userInfo.IsAdmin == "true" ||
              groupAdminId == userContext.userInfo.UserId) && (
              <>
                <div className="flex">
                  <div className="flex space-x-2">
                    <button className="ml-auto mb-2" onClick={handleShowEdit}>
                      <MdEdit size={22} />
                    </button>
                    <EditPostModal
                      Mshow={showEditModal}
                      onHide={handleShowEdit}
                      post={postDisplay}
                    />
                    <button className="ml-auto mb-2">
                      <TiDelete size={22} onClick={handleDelete} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            className=" font-bold flex justify-evenly"
            style={{
              height: "25px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {postDisplay.title}
          </div>

          <div className="relative  " />
          <div className="flex justify-evenly ">
            {postDisplay.imageURL && (
              <button className="" onClick={handelImage}>
                <img className="h-56 " src={postDisplay.imageURL} />
              </button>
            )}
          </div>

          <div className="p-0.5" />
          <div
            className={`${colors.TextBox}`}
            style={{
              height: "80px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {postDisplay.text}
          </div>
          <div
            className="flex pt-2 justify-between w-full"
            style={{ position: "sticky" }}
          >
            <div className="flex items-center">
              {postDisplay.link && (
                <button
                  className="pl-3"
                  onClick={() => window.open(postDisplay.link, "_blank")}
                >
                  <HiLink size={22} />
                </button>
              )}
              {postDisplay.keyWords.length > 0 && (
                <button
                  className="pl-3"
                  onClick={() =>
                    dialogs.showtext(postDisplay.keyWords.toString())
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
                  <FaCommentMedical size={21} aria-description="add comment" />
                </button>

                <AddPostCommentModal
                  Mshow={showModal}
                  onHide={handleClose}
                  postId={postDisplay.id}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Tooltip title="Copy post link">
                <button onClick={() => handleCopy(postDisplay.id)}>
                  <MdOutlineContentCopy size={24} />
                </button>
              </Tooltip>
              {!postDisplay.hasVoted && (
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
                  {postDisplay.totalVotes}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className={` font-bold ${colors.InteractionText} ml-16 -mt-2`}>
            {postDisplay.comments &&
              postDisplay.comments.length > 0 &&
              postDisplay.comments.length}
          </div>
          <div className="flex justify-end">{postDisplay.datetime}</div>
        </div>
      </ElementFrame>

      <div className="-mt-8 relative z-10 ">
        <CommentList index={0} commmentList={postDisplay.comments} />
      </div>
    </>
  );
};

export default PostView;
