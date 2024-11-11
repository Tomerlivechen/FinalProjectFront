import { useEffect, useState } from "react";
import { useUser } from "../CustomHooks/useUser";
import { IAppUserDisplay } from "../Models/UserModels";
import { auth } from "../Services/auth-service";
import { Chat } from "../Services/chat-service";
import { isEqual } from "lodash";
import ResizableFrame from "./Objects/ResizableFrame";
import { UserTabList } from "./Objects/UserTabList";
import { colors } from "../Constants/Patterns";
import DinoSpinner from "../Spinners/DinoSpinner";

const InteractingUsersLists = () => {
  const userContext = useUser();
  const [tempFollowingUsers, setTempFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [tempChattingUsers, setTempChattingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [followingUsers, setFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [chattingUsers, setChattingUsers] = useState<IAppUserDisplay[] | null>(
    null
  );

  const intervalTime = 5000;
  useEffect(() => {
    if (userContext.userInfo.UserId) {
      const interval = setInterval(() => {
        getInteractingUsersLists();
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [userContext.userInfo.UserId]);

  const getInteractingUsersLists = async () => {
    if (userContext.userInfo.UserId) {
      const fRespons = await auth.GetUsersFollowing(
        userContext.userInfo.UserId
      );
      const response = await Chat.GetNotFollowingChats();
      setTempChattingUsers(response.data);
      setTempFollowingUsers(fRespons.data);
    }
  };

  useEffect(() => {
    if (tempFollowingUsers) {
      if (!isEqual(tempFollowingUsers, followingUsers)) {
        setFollowingUsers(tempFollowingUsers);
      }
    }
    if (tempChattingUsers) {
      if (!isEqual(tempChattingUsers, chattingUsers)) {
        setChattingUsers(tempChattingUsers);
      }
    }
  }, [chattingUsers, followingUsers, tempChattingUsers, tempFollowingUsers]);

  return (
    <>
      <ResizableFrame
        whidth={"100%"}
        title={"People"}
        show={true}
        tailwindProps=" h-auto "
      >
        <div className={`${colors.ActiveText} text-center`}>Following</div>
        {!followingUsers && (
          <div className=" flex items-center justify-center">
            <DinoSpinner size={20} />
          </div>
        )}
        {followingUsers && <UserTabList users={followingUsers} />}

        <div className={`${colors.ActiveText} text-center`}>Open Chats</div>
        {!chattingUsers && (
          <div className=" flex items-center justify-center">
            <DinoSpinner size={20} />
          </div>
        )}
        {chattingUsers && <UserTabList users={chattingUsers} />}
      </ResizableFrame>
    </>
  );
};

export { InteractingUsersLists };
