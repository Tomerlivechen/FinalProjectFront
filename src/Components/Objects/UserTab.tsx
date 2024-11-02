import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";
import ElementFrame from "../../Constructors/ElementFrame";
import { colors, isValidURL } from "../../Constants/Patterns";
import { useNavigate } from "react-router-dom";
import { PiPlugsFill } from "react-icons/pi";
import { GiChatBubble } from "react-icons/gi";
import { useChat } from "../../CustomHooks/useChat";
import { UserTabProps } from "../../Types/@UserTypes";
import { Tooltip } from "react-bootstrap";

const UserTab: React.FC<UserTabProps> = (TabProps: UserTabProps) => {
  const [following, setFollowings] = useState(TabProps.UserDisplay.following);
  const [blocking, setblocking] = useState(TabProps.UserDisplay.blocked);
  const [blockedYou, setblockedYou] = useState(TabProps.UserDisplay.blockedYou);
  const [userInfo, setUserInfo] = useState<IAppUserDisplay>(
    TabProps.UserDisplay
  );
  const chatContext = useChat();

  const navigate = useNavigate();

  const setUpChat = async () => {
    const chatID = await chatContext.creatChat(userInfo.id);
    setUserInfo((prev) => ({ ...prev, chatId: chatID }));
  };

  const openNewChat = async () => {
    chatContext.addChat(userInfo.chatId);
  };

  useEffect(() => {
    setUserInfo(TabProps.UserDisplay);
    setFollowings(TabProps.UserDisplay.following);
    setblocking(TabProps.UserDisplay.blocked);
    setblockedYou(TabProps.UserDisplay.blockedYou);
  }, []);

  return (
    <>
      {!blockedYou ? (
        <ElementFrame tailwind="h-fit" width="200px" padding="2">
          <div
            className={`flex  ${
              blocking && "bg-stone-500 bg-opacity-15 rounded-full"
            } ${following && "bg-green-400 bg-opacity-15 rounded-full"} `}
          >
            <img
              className="rounded-full border-2 h-14 w-14 shadow-2xl p-1 "
              src={
                isValidURL(userInfo.imageURL)
                  ? userInfo.imageURL
                  : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
              }
              onClick={() => navigate(`/profile/${userInfo.id}`)}
              aria-description={`Profile picture of ${userInfo.first_Name} ${userInfo.last_Name}`}
            />

            <div
              className={`col-span-4 font-extrabold p-4 flex items-center gap-2 ${colors.ButtonFont}`}
            >
              {userInfo.userName}

              {userInfo.chatId ? (
                <Tooltip title="Open Chat">
                  <button
                    className="flex items-center"
                    onClick={() => openNewChat()}
                  >
                    <GiChatBubble size={24} />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Make Contact">
                  <button
                    className="flex items-center"
                    onClick={() => setUpChat()}
                  >
                    <PiPlugsFill size={24} />
                  </button>
                </Tooltip>
              )}
            </div>
            <div className=" ml-auto col-span-4 font-extrabold p-3 flex gap-3"></div>
          </div>
        </ElementFrame>
      ) : null}
    </>
  );
};

export default UserTab;
