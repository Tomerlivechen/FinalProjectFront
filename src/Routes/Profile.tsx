import { useEffect, useState } from "react";
import ProfileUserSection from "../Components/ProfileUserSection";
import { auth } from "../Services/auth-service";

import { useLocation, useSearchParams } from "react-router-dom";
import { PostFrame } from "../Components/PostFrame";
import ResizableFrame from "../Components/Objects/ResizableFrame";
import { UserTabList } from "../Components/Objects/UserTabList";
import { IAppUserDisplay } from "../Models/UserModels";
import { ProfileGroupsList } from "../Components/Objects/ProfileGroupsList";
import { ImageList } from "../Components/Objects/ImageList";
import { isEqual } from "lodash";
import { MotionFrame } from "../Components/Objects/MotionFrame";

const Profile = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [userIdState, setUserIdState] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersList, setUsersList] = useState<IAppUserDisplay[] | null>(null);
  const [imagesOpen, setImagesOpen] = useState(false);

  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = () => {
    const _userId = searchParams.get("userId");
    if (_userId && !isEqual(userId, _userId)) {
      setUserId(_userId);
    } else {
      setUserId(null);
    }
  };

  const GetFollowing = async (profileId: string) => {
    const response = await auth.GetUsersFollowing(profileId);
    setUsersList(response.data);
  };

  useEffect(() => {
    setUsersList(null);
    setUserIdState(null);
    setLoadingUsers(true);
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (userIdState) {
        setLoadingUsers(true);
        await GetFollowing(userIdState);
        setLoadingUsers(false);
      }
    };
    fetchFollowing();
  }, [userIdState]);

  useEffect(() => {
    if (loadingUsers) {
      if (userId) {
        setUserIdState(userId);
      }
    }
  }, [loadingUsers, userId]);

  const intervalTime = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (userIdState) {
        GetFollowing(userIdState);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (usersList) {
      setLoadingUsers(false);
    }
  }, [usersList]);
  return (
    <>
      <MotionFrame>
        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-11/12 md:px-2">
            <div className="  md:px-2 min-w-[370px]  w-fit md:w-[57rem] lg:w-[99rem] xl:w-[99rem] ">
              {userIdState && <ProfileUserSection userId={userIdState} />}
            </div>

            <div className="  md:px-2 min-w-[370px]  w-fit md:w-[55rem] lg:w-[72rem] xl:w-[99rem] ">
              <div className="flex flex-col md:flex-row justify-between w-full md:w-8/12   ">
                {!imagesOpen && (
                  <div className=" lg:w-fit md:pl-2 md:pr-2 md:h-1/2">
                    <>
                      <ResizableFrame
                        title={"Groups"}
                        show={true}
                        overflowX={false}
                        tailwindProps="w-[370px]  md:w-fit h-fit"
                      >
                        <ProfileGroupsList />
                      </ResizableFrame>
                    </>
                  </div>
                )}
                <div className="flex flex-col lg:flex-row ">
                  <div
                    className={`${
                      imagesOpen ? "md:w-full w-[370px]" : ""
                    } lg:w-[160px] w-[370px] md:ml-8 lg:ml-0 `}
                  >
                    <ImageList
                      ImageListProps={{
                        open: imagesOpen,
                        setOpen: setImagesOpen,
                      }}
                    />
                  </div>
                  {!imagesOpen && (
                    <>
                      <div className="  lg:w-fit md:pl-2 md:ml-6 lg:ml-0 ">
                        {!loadingUsers && usersList && (
                          <>
                            <ResizableFrame
                              title={"Following"}
                              show={true}
                              tailwindProps="w-[370px]  lg:w-fit h-fit"
                            >
                              <UserTabList users={usersList} />
                            </ResizableFrame>
                          </>
                        )}
                      </div>

                      <div className="w-full lg:w-fit md:pl-2 pr-2 md:ml-2 lg:ml-0">
                        <PostFrame />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionFrame>
    </>
  );
};

export default Profile;
