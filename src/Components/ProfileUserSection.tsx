import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../Models/UserModels";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import { FaUserGear } from "react-icons/fa6";
import { colors, isValidURL } from "../Constants/Patterns";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaHandshakeSlash } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiBurningMeteor, GiChatBubble, GiEggEye } from "react-icons/gi";
import { PiPlugsFill } from "react-icons/pi";
import { useChat } from "../CustomHooks/useChat";
import { ProfileUserSectionProps } from "../Types/@UserTypes";
import { isEqual } from "lodash";
import DinoSpinner from "../Spinners/DinoSpinner";

const ProfileUserSection: React.FC<ProfileUserSectionProps> = ({ userId }) => {
  const userContex = useUser();
  const [searchParams] = useSearchParams();

  const [bioMore, setBioMore] = useState(false);
  const [user, setUser] = useState<IAppUserDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userdata = useUser();
  const [yours, setYours] = useState(false);
  const chatContext = useChat();
  const location = useLocation();

  const [paramUserId, setUserId] = useState<null | string>(null);

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

  useEffect(() => {
    if (userdata.userInfo.UserId) {
      const effectiveUserId = userId || paramUserId || userdata.userInfo.UserId;
      if (effectiveUserId) {
        getUser(effectiveUserId);
        setYours(!userId);
      }
    }
  }, [
    userId,
    userdata.userInfo.UserId,
    paramUserId,
    location.pathname,
    searchParams,
  ]);

  const getUser = async (id: string) => {
    const response = await auth.getUser(id);
    setUser(response.data);
  };

  const toggleBan = async () => {
    if (userId) {
      const response = await auth.toggleInactivation(userId);
      setUser(response.data);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user, yours]);

  const toggleBioMore = () => {
    setBioMore((prev) => !prev);
  };

  const toggleFollow = async () => {
    if (user) {
      if (user.following) {
        const success = await auth.unfollow(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, following: false };
          });
        }
      }
      if (!user.following) {
        const success = await auth.follow(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, following: true };
          });
        }
      }
    }
  };
  const toggleBlock = async () => {
    if (user) {
      if (user.blocked) {
        const success = await auth.unBlock(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, blocked: false };
          });
        }
      }
      if (!user.blocked) {
        const success = await auth.block(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, blocked: true };
          });
        }
      }
    }
  };
  const setUpChat = async () => {
    if (user) {
      const chatID = await chatContext.creatChat(user.id);
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, chatId: chatID };
      });
    }
  };

  const openNewChat = async () => {
    if (user) {
      chatContext.addChat(user.chatId);
    }
  };

  return (
    <>
      <div className="p-1">
        {loading && <DinoSpinner size={80} />}
        {!loading && user && !user.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg overflow-hidden w-2/3`}
            >
              <div className="relative">
                <img
                  src={user.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-6 flex items-center space-x-4">
                  <img
                    src={
                      isValidURL(user.imageURL)
                        ? user.imageURL
                        : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1729955566/isdaejsdshqjsjmvdy14.jpg"
                    }
                    alt="User profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <p
                    className={`text-2xl font-bold text-left mt-5 ${colors.ButtonFont}`}
                  >
                    {user.userName.slice(0, 25)}
                    {user.userName.length > 25 && "..."}
                    {userContex.userInfo.IsAdmin == "true" && (
                      <button
                        onClick={toggleBan}
                        className={`inline-flex items-center ml-3 mt-4 ${colors.ElementFrame} border-2 rounded-md border-red-700`}
                      >
                        {user.isActive ? (
                          <span className="inline-flex items-center">
                            <GiBurningMeteor size={25} /> Ban
                          </span>
                        ) : (
                          <span className="inline-flex items-center">
                            <GiEggEye size={25} /> Unban
                          </span>
                        )}
                      </button>
                    )}
                  </p>
                </div>
                <div className="absolute right-0 p-2 md:mt-0 mt-10">
                  {userContex.userInfo.UserId == user.id && (
                    <button onClick={() => navigate("/settings")}>
                      <FaUserGear
                        className={`${colors.ButtonFont}`}
                        size={25}
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className={` pt-16 px-6 pb-6 ${colors.ButtonFont}`}>
                <div className="flex flex-row">
                  <div className="w-9/12 pr-4 ">
                    <div className="text-center">
                      {!user.hideName && (
                        <h2 className="text-xl font-bold text-left">{`${user.prefix}. ${user.first_Name} ${user.last_Name} (${user.pronouns})`}</h2>
                      )}
                      {!user.hideEmail && (
                        <p className=" text-left">{user.email}</p>
                      )}

                      <div className=" text-left mt-4">
                        <h1 className="text-2xl font-bold">About</h1>
                      </div>
                      <p
                        className={` text-left mt-2 ${
                          bioMore ? "h-fit" : "h-12"
                        }  overflow-hidden `}
                      >
                        {user.bio}
                      </p>
                    </div>
                    {user.bio.length > 200 && (
                      <div>
                        <p className={` text-left mt-2  `}> </p>
                        <button
                          onClick={toggleBioMore}
                          className={`${colors.ElementFrame} font-extrabold`}
                        >
                          {bioMore ? "Less" : "More"}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col items-end space-y-4 ml-auto ">
                    {!user.blockedYou &&
                      userContex.userInfo.UserId !== user.id && (
                        <>
                          <div className="w-3/12 flex flex-col items-end space-y-4 ml-auto">
                            {user.following ? (
                              <button
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                                onClick={toggleFollow}
                              >
                                <FaHandHolding size={25} />
                                <span> Unfollow</span>
                              </button>
                            ) : (
                              <button
                                className={`${colors.ElementFrame} ${colors.ActiveText} p-2 rounded-xl `}
                                onClick={toggleFollow}
                              >
                                <div
                                  className={`hover:text-emerald-600 flex items-center gap-2`}
                                >
                                  <FaHandHoldingHeart size={25} />
                                  Follow
                                </div>
                              </button>
                            )}
                            {user.blocked ? (
                              <button
                                onClick={toggleBlock}
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                              >
                                <FaHandshake size={25} />
                                <span>Unblock</span>
                              </button>
                            ) : (
                              <button
                                onClick={toggleBlock}
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                              >
                                <FaHandshakeSlash size={25} />
                                <span>Block</span>
                              </button>
                            )}
                            <div>
                              {user.chatId ? (
                                <button
                                  className={`${colors.ElementFrame} ${colors.ActiveText} p-2 rounded-xl flex items-center gap-2 `}
                                  onClick={() => openNewChat()}
                                >
                                  Chat
                                  <GiChatBubble size={24} />
                                </button>
                              ) : (
                                <button
                                  className={`${colors.ElementFrame} ${colors.ActiveText} w-40 p-2 rounded-xl flex items-center gap-2`}
                                  onClick={() => setUpChat()}
                                >
                                  Make contact
                                  <PiPlugsFill size={24} />
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    {user.blockedYou && (
                      <div className="text-sm text-zinc-600">
                        You Have been blocked
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileUserSection;
