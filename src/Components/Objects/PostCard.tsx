import React, { useState } from "react";

import ElementFrame from "../../Constructors/ElementFrame";
import { dialogs } from "../../Constants/AlertsConstant";
import { TiDelete } from "react-icons/ti";

import { useUser } from "../../CustomHooks/useUser";

import { IPostDisplay } from "../../Models/Interaction";

import { BsArrowsFullscreen } from "react-icons/bs";
import { colors, convertUTCToLocalTime } from "../../Constants/Patterns";
import PostView from "./PostView";
import { Posts } from "../../Services/post-service";

const PostCard: React.FC<IPostDisplay> = (postDisplay) => {
  const [card, setCard] = useState(true);

  const userContext = useUser();
  const handelImage = () => {
    dialogs.showImage("", postDisplay.imageURL);
  };

  const toggleCard = () => {
    setCard((prevCrad) => !prevCrad);
  };
  const handleDelete = () => Posts.DeletePost(postDisplay.id);
  return (
    <>
      <button
        className=" flex justify-center pl-2 -mb-10 "
        onClick={toggleCard}
      >
        <BsArrowsFullscreen size={25} className={`z-50 ${colors.ButtonFont}`} />
      </button>
      {card ? (
        <ElementFrame
          height={`${postDisplay.imageURL ? "230px" : "90px"}`}
          width="400px"
          padding="2 mt-2 border-4 border-white "
        >
          <div>
            <div className="flex">
              <button className=" text-sm font-bold pl-10">
                {postDisplay.authorName}
              </button>
              {(postDisplay?.authorId == userContext.userInfo.UserId ||
                userContext.userInfo.IsAdmin == "true") && (
                <button className="ml-auto mb-2">
                  <TiDelete size={22} onClick={handleDelete} />
                </button>
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
              <button>{postDisplay.title}</button>
            </div>
            <div className="relative  " />
            <div className="flex justify-evenly ">
              {postDisplay.imageURL && (
                <button className="" onClick={handelImage}>
                  <img className="h-32 " src={postDisplay.imageURL} />
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={` font-bold ${colors.InteractionText} ml-16 -mt-2`}
            />

            <div className="flex justify-end">
              {convertUTCToLocalTime(postDisplay.datetime, false)}
            </div>
          </div>
        </ElementFrame>
      ) : (
        <>
          <PostView {...postDisplay} />
          <div className="pb-9" />
        </>
      )}
    </>
  );
};

export default PostCard;
