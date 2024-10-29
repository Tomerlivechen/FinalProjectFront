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
import { ImageList } from "../Components/Objects/ImageList";

const Profile = () => {
  const userContext = useUser();
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersList, setUsersList] = useState<IAppUserDisplay[] | null>(null);
  const [imagesOpen, setImagesOpen] = useState(false);

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

          <div className="flex flex-col md:flex-row justify-between w-full md:w-8/12 ">
            {!imagesOpen && (
              <div className="hidden lg:block lg:w-fit pl-2 pr-2 h-1/2">
                <>
                  <ResizableFrame
                    title={"Groups"}
                    show={true}
                    overflowX={false}
                    tailwindProps="w-fit h-fit"
                  >
                    <ProfileGroupsList />
                  </ResizableFrame>
                </>
              </div>
            )}
            <div
              className={`${imagesOpen ? "md:w-full" : "md:w-fit"} w-[26rem] `}
            >
              <ImageList
                ImageListProps={{ open: imagesOpen, setOpen: setImagesOpen }}
              />
            </div>
            {!imagesOpen && (
              <>
                <div className="hidden xl:block lg:w-fit pl-2 ">
                  {!loadingUsers && usersList && (
                    <>
                      <ResizableFrame
                        title={"Following"}
                        show={true}
                        tailwindProps="w-fit h-fit"
                      >
                        <UserTabList users={usersList} />
                      </ResizableFrame>
                    </>
                  )}
                </div>
                <div className="w-full lg:w-fit pl-2 pr-2">
                  <PostFrame UserList={[]} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
