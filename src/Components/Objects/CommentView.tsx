import React, { useEffect, useState } from "react";
import { ICommentDisplay } from "../../Models/Interaction";
import { HiLink } from "react-icons/hi2";
import { IoImage } from "react-icons/io5";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import ElementFrame from "../../Constructors/ElementFrame";
import { dialogs } from "../../Constants/AlertsConstant";
import { TiDelete } from "react-icons/ti";
import { MdEdit, MdExpand, MdOutlineCompress } from "react-icons/md";
import { useUser } from "../../CustomHooks/useUser";
import { CommentService } from "../../Services/comment-service";
import { useLogin } from "../../CustomHooks/useLogin";

import { CommentList } from "./CommentList";
import AddCommentCommentModal from "../../Modals/AddCommentCommentModal";
import { FaCommentMedical } from "react-icons/fa";
import { colors, convertUTCToLocalTime } from "../../Constants/Patterns";
import EditCommentModal from "../../Modals/EditCommentModal";
import { TbMobiledataOff } from "react-icons/tb";
import { Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CommentView: React.FC<ICommentDisplay> = (commentDisplay) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navagate = useNavigate();
  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);
  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const [
    commentDisplayState,
    setCommentDisplayState,
  ] = useState<ICommentDisplay | null>(null);
  const CommentAPI = CommentService;
  const [longText, setLongText] = useState({
    textLength: 0,
    OpenTextBox: false,
  });

  //remove vote
  const unvote = async () => {
    if (commentDisplayState) {
      const respons = await CommentService.unvoteComment(
        commentDisplayState.id
      );
      setCommentDisplayState(respons.data);
    }
  };
  //update comment on mount
  useEffect(() => {
    if (commentDisplay) {
      updateComment();
    }
  }, []);

  // open image
  const handelImage = () => {
    if (commentDisplayState) {
      dialogs.showImage("", commentDisplayState.imageURL);
    }
  };
  //vote on coment
  const handleVote = async (vote: number) => {
    if (loginContex.token && commentDisplayState) {
      const respons = await CommentAPI.VoteOnComment(
        commentDisplayState.id,
        vote
      );
      setCommentDisplayState(respons.data);
    }
  };
  //update comment
  const handleShowEdit = async () => {
    await updateComment();
    setShowEditModal((prevshowEditModal) => !prevshowEditModal);
  };
  //update comment
  const updateComment = async () => {
    const respons = await CommentService.GetCommentByID(commentDisplay.id);
    setCommentDisplayState(respons.data);
  };
  //update coment when modal closes
  useEffect(() => {
    updateComment();
  }, [showEditModal, showModal]);
  // delete comment and remove comment once confirmed deleteion
  const handleDelete = async () => {
    if (commentDisplayState) {
      const respons = await CommentService.DeleteComment(
        commentDisplayState.id
      );
      if (respons.status === 200) {
        setCommentDisplayState(null);
      }
    }
  };

  const GoToUser = () => {
    if (commentDisplayState) {
      navagate(`/profile?userId=${commentDisplayState.authorId}`);
    }
  };

  useEffect(() => {
    if (commentDisplayState) {
      setLongText((prev) => ({
        ...prev,
        textLength: commentDisplayState.text.length,
      }));
    }
  }, [commentDisplayState]);
  // expand text box size
  const toggleExpandText = () => {
    const openBox = longText.OpenTextBox;
    setLongText((prev) => ({ ...prev, OpenTextBox: !openBox }));
  };

  return (
    <>
      {commentDisplayState && (
        <>
          <ElementFrame
            tailwind="h-fit w-[340px] md:w-[400px]"
            padding="2"
            position="relative"
            margin="t-2"
          >
            <div>
              <div className="flex justify-between items-center">
                <button
                  className=" text-sm font-bold"
                  onClick={() => GoToUser()}
                >
                  {commentDisplayState?.authorName}
                </button>
                {(commentDisplayState?.authorId ==
                  userContext.userInfo.UserId ||
                  userContext.userInfo.IsAdmin == "true") && (
                  <>
                    <div className="flex">
                      <div className="flex space-x-2">
                        <button
                          className="ml-auto mb-2"
                          onClick={handleShowEdit}
                        >
                          <MdEdit size={22} />
                        </button>

                        <EditCommentModal
                          Mshow={showEditModal}
                          onHide={handleShowEdit}
                          comment={commentDisplayState}
                        />

                        <button className="ml-auto mb-2">
                          <TiDelete size={22} onClick={handleDelete} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {longText.textLength > 180 && (
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
              <div
                className={`${
                  colors.TextBox
                } dark:scrollbar-dark scrollbar-light ${
                  longText.OpenTextBox ? "h-fit" : "h-20"
                }`}
                style={{
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {commentDisplayState?.text}
              </div>
              <div className="flex pt-2 justify-between w-full">
                <div className="flex items-center">
                  {commentDisplayState?.link && (
                    <button
                      className="pl-3"
                      onClick={() =>
                        window.open(commentDisplayState.link, "_blank")
                      }
                    >
                      <HiLink size={20} />
                    </button>
                  )}
                  {commentDisplayState?.imageURL && (
                    <button className="pl-3" onClick={handelImage}>
                      <IoImage size={20} />
                    </button>
                  )}

                  <div className="flex items-center pl-4">
                    <button
                      className={`flex items-center pl-3`}
                      onClick={handleShow}
                    >
                      <FaCommentMedical
                        size={21}
                        aria-description="add comment"
                      />
                    </button>

                    <AddCommentCommentModal
                      Mshow={showModal}
                      onHide={handleClose}
                      commentId={commentDisplayState.id}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  {commentDisplayState?.hasVoted && (
                    <button
                      onClick={() => {
                        unvote();
                      }}
                    >
                      <TbMobiledataOff size={24} className="ml-3 " />
                    </button>
                  )}
                  {!commentDisplayState?.hasVoted && (
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
                      {commentDisplayState?.totalVotes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={` font-bold ${colors.InteractionText} ml-16 mt-4`}
              >
                {commentDisplayState.comments &&
                  commentDisplayState.comments.length > 0 &&
                  commentDisplayState.comments.length}
              </div>
              <div className="flex justify-end">
                {convertUTCToLocalTime(commentDisplayState?.datetime, false)}
              </div>
            </div>
          </ElementFrame>

          <div
            className={`-mt-7 font-bold ${colors.InteractionText}`}
            style={{ position: "relative", zIndex: 100 }}
          >
            <CommentList
              index={0}
              commmentList={commentDisplayState?.comments}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CommentView;
