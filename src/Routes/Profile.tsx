import { useEffect, useState } from "react";
import ProfileUserSection from "../Components/ProfileUserSection";
import { auth } from "../Services/auth-service";

import { useParams } from "react-router-dom";
import { useUser } from "../CustomHooks/useUser";
import { PostFrame } from "../Components/PostFrame";
import ResizableFrame from "../Components/Objects/ResizableFrame";
import { UserTabList } from "../Components/Objects/UserTabList";
import { IAppUserDisplay } from "../Models/UserModels";
import { ProfileGroupsList } from "../Components/Objects/ProfileGroupsList";

const Profile = () => {
  const userContext = useUser();
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersList, setUsersList] = useState<IAppUserDisplay[] | null>(null);

  const GetFollowing = async (profileId: string) => {
    const response = await auth.GetUsersFollowing(profileId);
    setUsersList(response.data);
  };

  useEffect(() => {
    if (userId) {
      GetFollowing(userId);
      setUserIdState(userId);
    } else if (userContext.userInfo.UserId) {
      GetFollowing(userContext.userInfo.UserId);
    }
  }, [userId]);

  useEffect(() => {
    if (usersList) {
      setLoadingUsers(false);
    }
  }, [usersList]);

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-16 pl-2 pr-2"></div>
        <div className="w-11/12 lg:block lg:w-11/12 pl-2 pr-2">
          <div className="w-full min-w-[40rem] pr-2 pl-2">
            <ProfileUserSection userId={userIdState} />
          </div>

          <div className="flex  justify-between w-8/12 ">
            <div className="hidden lg:block lg:w-fit pl-2 pr-2 h-1/2">
              <>
                <ResizableFrame
                  title={"Groups"}
                  show={true}
                  overflowX={false}
                  tailwindProps="w-fit h-full"
                >
                  <ProfileGroupsList />
                </ResizableFrame>
              </>
            </div>
            <div className="hidden xl:block lg:w-fit pl-2 ">
              {!loadingUsers && usersList && (
                <>
                  <ResizableFrame
                    title={"Following"}
                    show={true}
                    tailwindProps="w-fit h-full"
                  >
                    <UserTabList users={usersList} />
                  </ResizableFrame>
                </>
              )}
            </div>
            <div className="w-fit lg:w-fit pl-2 pr-2">
              <PostFrame UserList={[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
