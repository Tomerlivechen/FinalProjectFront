import React, { useState } from "react";

import ElementFrame from "../../Constructors/ElementFrame";
import { auth } from "../../Services/auth-service";
import { dialogs } from "../../Constants/AlertsConstant";
import { catchError, isValidURL } from "../../Constants/Patterns";
import { useUser } from "../../CustomHooks/useUser";
import { useNavigate } from "react-router-dom";
import { UserCardProps } from "../../Types/@UserTypes";

const UserCard: React.FC<UserCardProps> = ({ UserDisplay }) => {
  const [following, setFollowings] = useState(UserDisplay.following);
  const [blocking, setblocking] = useState(UserDisplay.blocked);

  const userContext = useUser();
  const navigate = useNavigate();

  const handleFollow = () => {
    auth
      .follow(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs.success(`Following ${UserDisplay.userName}`).then(() => {
            UserDisplay.following = true;
            setFollowings(UserDisplay.following);
          });
      })
      .catch((error) => {
        catchError(error, "Following");
      });
  };
  const handleUnfollow = () => {
    auth
      .unfollow(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs.success(`Unfollowing ${UserDisplay.userName}`).then(() => {
            UserDisplay.following = false;
            setFollowings(UserDisplay.following);
          });
      })
      .catch((error) => {
        catchError(error, "Unfollowing");
      });
  };
  const handleBlock = () => {
    auth
      .block(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs.success(`Blocked ${UserDisplay.userName}`).then(() => {
            UserDisplay.blocked = true;
            setblocking(UserDisplay.blocked);
          });
      })
      .catch((error) => {
        catchError(error, "Blocking");
      });
  };
  const handleUnBlock = () => {
    auth
      .unBlock(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs.success(`Unblocked ${UserDisplay.userName}`).then(() => {
            UserDisplay.blocked = false;
            setblocking(UserDisplay.blocked);
          });
      })
      .catch((error) => {
        catchError(error, "Unblocking");
      });
  };

  if (UserDisplay.blockedYou && UserDisplay.hideBlocked) {
    return null;
  } else {
    return (
      <>
        <ElementFrame tailwind="h-fit w-[260px] md:w-[650px]" padding="2">
          <div className="flex">
            <div className="col-span-5 md:col-span-2 md:w-24 flex items-center justify-center ">
              <img
                className={`rounded-full  border-1 shadow-2xl  w-24 flex ${
                  UserDisplay.online
                    ? `border-4 border-emerald-500`
                    : `border-4 border-amber-500`
                } `}
                src={
                  isValidURL(UserDisplay.imageURL)
                    ? UserDisplay.imageURL
                    : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
                }
                onClick={() => navigate(`/profile?userId=${UserDisplay.id}`)}
                aria-description={`Profile picture of ${UserDisplay.first_Name} ${UserDisplay.last_Name}`}
              />
            </div>
            <div className=" ml-6 col-span-5 md:col-span-4 font-extrabold text-emerald-800 md:flex p-3 items-center">
              {UserDisplay.userName.slice(0, 15)}
              {UserDisplay.userName.length > 15 && "..."}
            </div>
            <div className="hidden md:flex items-center">
              {!UserDisplay.hideName && (
                <div className=" ml-4 col-span-4 font-extrabold p-3 ">
                  {`${UserDisplay.prefix}. ${UserDisplay.first_Name.slice(
                    0,
                    10
                  )}
              ${
                UserDisplay.first_Name.length > 10 ? "..." : ""
              } ${UserDisplay.last_Name.slice(0, 10)}
              ${UserDisplay.last_Name.length > 10 ? "..." : ""} (${
                    UserDisplay.pronouns
                  })`}
                </div>
              )}
              <div className=" ml-auto col-span-2 font-extrabold p-3 flex gap-3">
                {!UserDisplay.blockedYou &&
                  userContext.userInfo.UserId !== UserDisplay.id && (
                    <>
                      {following ? (
                        <button onClick={handleUnfollow}>Unfollow</button>
                      ) : (
                        <button onClick={handleFollow}>Follow</button>
                      )}
                      {blocking ? (
                        <button onClick={handleUnBlock}>Unblock</button>
                      ) : (
                        <button onClick={handleBlock}>Block</button>
                      )}
                    </>
                  )}
                {UserDisplay.blockedYou && (
                  <div className="text-sm text-zinc-600">
                    You Have been blocked
                  </div>
                )}
              </div>
            </div>
          </div>
        </ElementFrame>
      </>
    );
  }
};

export default UserCard;
