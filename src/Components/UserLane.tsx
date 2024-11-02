import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../Models/UserModels";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";

import { colors, isValidURL } from "../Constants/Patterns";
import { ProfileUserSectionProps } from "../Types/@UserTypes";

const UserLane: React.FC<ProfileUserSectionProps> = ({ userId }) => {
  const [user, setUser] = useState<IAppUserDisplay | null>(null);
  const [loading, setLoading] = useState(false);

  const userdata = useUser();
  const [, setYours] = useState(false);
  useEffect(() => {
    if (userId) {
      getUser(userId);
    } else if (userdata.userInfo.UserId) {
      getUser(userdata.userInfo.UserId);
      setYours(true);
    }
  }, [userId, userdata.userInfo.UserId]);

  const getUser = async (id: string) => {
    console.log(id);
    await auth
      .getUser(id)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="p-1">
        {loading && <ClimbBoxSpinner />}
        {!loading && user && !user.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg overflow-hidden w-full`}
            >
              <div className="relative">
                <img
                  src={user.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-1/2 flex transform -translate-x-1/2 items-center space-x-4">
                  <img
                    src={
                      isValidURL(user.imageURL)
                        ? user.imageURL
                        : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
                    }
                    alt="User profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </div>
              </div>
              <div
                className={`pt-6 px-6 flex justify-center items-center pb-6 ${colors.ButtonFont}`}
              >
                <div className="text-center">
                  <p className={`text-2xl font-bold mt-5 ${colors.ButtonFont}`}>
                    {user.userName}
                  </p>
                  {!user.hideName && (
                    <h2 className="text-xl font-bold">
                      {`${user.prefix}. ${user.first_Name} ${user.last_Name}`}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserLane;
