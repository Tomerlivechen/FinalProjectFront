import React, { useState } from "react";

import ElementFrame from "../../Constructors/ElementFrame";
import { auth } from "../../Services/auth-service";
import { useLogin } from "../../CustomHooks/useLogin";
import { dialogs } from "../../Constants/AlertsConstant";
import { catchError } from "../../Constants/Patterns";
import { useUser } from "../../CustomHooks/useUser";
import { useNavigate } from "react-router-dom";
import { UserCardProps } from "../../Types/@UserTypes";

const UserCard: React.FC<UserCardProps> = ({ UserDisplay }) => {
  const [following, setFollowings] = useState(UserDisplay.following);
  const [blocking, setblocking] = useState(UserDisplay.blocked);
  const loginContext = useLogin();
  const userContext = useUser();
  const navigate = useNavigate();
  const handleFollow = () => {
    console.log(loginContext.token ?? "", UserDisplay.id);
    auth
      .follow(UserDisplay.id.toString())
      .then((response) => {
        console.log(response);
        if (response.status == 200)
          dialogs
            .success(`Following ${UserDisplay.userName}`)
            .then((response) => {
              console.log(response);
              UserDisplay.following = true;
              setFollowings(UserDisplay.following);
            });
      })
      .catch((error) => {
        catchError(error, "Following");
      });
  };
  const handleUnfollow = () => {
    console.log(UserDisplay.id);
    auth
      .unfollow(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs
            .success(`Unfollowing ${UserDisplay.userName}`)
            .then((response) => {
              console.log(response);
              UserDisplay.following = false;
              setFollowings(UserDisplay.following);
            });
      })
      .catch((error) => {
        catchError(error, "Unfollowing");
      });
  };
  const handleBlock = () => {
    console.log(UserDisplay.id);
    auth
      .block(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs
            .success(`Blocked ${UserDisplay.userName}`)
            .then((response) => {
              console.log(response);
              UserDisplay.blocked = true;
              setblocking(UserDisplay.blocked);
            });
      })
      .catch((error) => {
        catchError(error, "Blocking");
      });
  };
  const handleUnBlock = () => {
    console.log(loginContext.token ?? "", UserDisplay.id);
    auth
      .unBlock(UserDisplay.id.toString())
      .then((response) => {
        if (response.status == 200)
          dialogs
            .success(`Unblocked ${UserDisplay.userName}`)
            .then((response) => {
              console.log(response);
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
        <ElementFrame height="60px" width="650px" padding="5">
          <div className="flex">
            <div className=" col-span-2">
              <img
                height={100}
                width={60}
                className="rounded-full border-2 shadow-2xl"
                src={
                  UserDisplay.imageURL
                    ? UserDisplay.imageURL
                    : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
                }
                onClick={() => navigate(`/profile/${UserDisplay.id}`)}
                aria-description={`Profile picture of ${UserDisplay.first_Name} ${UserDisplay.last_Name}`}
              />
            </div>
            <div className=" ml-6 col-span-4 font-extrabold text-emerald-800 p-3">
              {UserDisplay.userName}
            </div>
            {!UserDisplay.hideName && (
              <div className=" ml-4 col-span-4 font-extrabold p-3">
                {`${UserDisplay.prefix}. ${UserDisplay.first_Name} 
          ${UserDisplay.last_Name} (${UserDisplay.pronouns})`}
              </div>
            )}
            <div className=" ml-auto col-span-4 font-extrabold p-3 flex gap-3">
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
        </ElementFrame>
      </>
    );
  }
};

export default UserCard;
