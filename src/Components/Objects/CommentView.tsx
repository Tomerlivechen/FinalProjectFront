import React, { useState } from "react";
import { ICommentDisplay } from "../../Models/Interaction";
import { HiLink } from "react-icons/hi2";
import { IoImage } from "react-icons/io5";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import ElementFrame from "../../Constructors/ElementFrame";
import { dialogs } from "../../Constants/AlertsConstant";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { useUser } from "../../CustomHooks/useUser";
import { CommentService } from "../../Services/comment-service";
import { useLogin } from "../../CustomHooks/useLogin";

import { CommentList } from "./CommentList";
import AddCommentCommentModal from "../../Modals/AddCommentCommentModal";
import { FaCommentMedical } from "react-icons/fa";
import { colors } from "../../Constants/Patterns";
import EditCommentModal from "../../Modals/EditCommentModal";

const CommentView: React.FC<ICommentDisplay> = (commentDisplay) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);
  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const CommentAPI = CommentService;
  const handelImage = () => {
    dialogs.showImage("", commentDisplay.imageURL);
  };

  const handleVote = async (vote: number) => {
    if (loginContex.token) {
      await CommentAPI.VoteOnComment(commentDisplay.id, vote);
      commentDisplay.hasVoted = true;
      commentDisplay.totalVotes += vote;
    }
  };
  const handleShowEdit = () =>
    setShowEditModal((prevshowEditModal) => !prevshowEditModal);
  const handleDelete = () => CommentService.DeleteComment(commentDisplay.id);

  return (
    <>
      <ElementFrame
        height="190px"
        width="400px"
        padding="2"
        position="relative"
        margin="t-2"
      >
        <div>
          <div className="flex justify-between items-center">
            <button className=" text-sm font-bold">
              {commentDisplay.authorName}
            </button>
            {(commentDisplay.authorId == userContext.userInfo.UserId ||
              userContext.userInfo.IsAdmin == "true") && (
              <>
                <div className="flex">
                  <div className="flex space-x-2">
                    <button className="ml-auto mb-2" onClick={handleShowEdit}>
                      <MdEdit size={22} />
                    </button>
                    <EditCommentModal
                      Mshow={showEditModal}
                      onHide={handleShowEdit}
                      comment={commentDisplay}
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
            className={`${colors.TextBox}`}
            style={{
              height: "80px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {commentDisplay.text}
          </div>
          <div className="flex pt-2 justify-between w-full">
            <div className="flex items-center">
              {commentDisplay.link && (
                <button
                  className="pl-3"
                  onClick={() => window.open(commentDisplay.link, "_blank")}
                >
                  <HiLink size={20} />
                </button>
              )}
              {commentDisplay.imageURL && (
                <button className="pl-3" onClick={handelImage}>
                  <IoImage size={20} />
                </button>
              )}

              <div className="flex items-center pl-4">
                <button
                  className={`flex items-center pl-3`}
                  onClick={handleShow}
                >
                  <FaCommentMedical size={21} aria-description="add comment" />
                </button>
                <AddCommentCommentModal
                  Mshow={showModal}
                  onHide={handleClose}
                  commentId={commentDisplay.id}
                />
              </div>
            </div>
            <div className="flex items-center">
              {!commentDisplay.hasVoted && (
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
                  {commentDisplay.totalVotes}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className={` font-bold ${colors.InteractionText} ml-16 mt-4`}>
            {commentDisplay.comments &&
              commentDisplay.comments.length > 0 &&
              commentDisplay.comments.length}
          </div>
          <div className="flex justify-end">{commentDisplay.datetime}</div>
        </div>
      </ElementFrame>

      <div
        className={`-mt-7 font-bold ${colors.InteractionText}`}
        style={{ position: "relative", zIndex: 100 }}
      >
        <CommentList index={0} commmentList={commentDisplay.comments} />
      </div>
    </>
  );
};

export default CommentView;
