import { useEffect, useState } from "react";
import { useUser } from "../../CustomHooks/useUser";
import { FaUserGear } from "react-icons/fa6";
import { colors } from "../../Constants/Patterns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ISocialGroupDisplay } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { BsPersonFillDash } from "react-icons/bs";
import { IAppUserDisplay } from "../../Models/UserModels";
import { auth } from "../../Services/auth-service";
import { Tooltip } from "react-bootstrap";
import { GiClawHammer } from "react-icons/gi";
import { dialogs } from "../../Constants/AlertsConstant";
import { isEqual } from "lodash";
import DinoSpinner from "../../Spinners/DinoSpinner";

const GroupProfileSection = () => {
  const [searchParams] = useSearchParams();

  const [bioMore, setBioMore] = useState(false);

  const [groupInfo, SetGroupInfo] = useState<ISocialGroupDisplay | null>();
  const [loading, setLoading] = useState(true);
  const userContext = useUser();
  const navigate = useNavigate();
  const [groupAdmin, setGroupAdmin] = useState<IAppUserDisplay | null>(null);

  const [groupId, setGroupId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);
  //get the group ID form the search params
  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setGroupId(_groupId);
    } else {
      setGroupId(null);
    }
  };
  // once you have the ID get group information
  const getGroupInfo = async (GroupId: string) => {
    const response = await Groups.GetGroupbyId(GroupId);
    SetGroupInfo(response.data);
  };

  const getAdmin = async (AdminId: string) => {
    const respons = await auth.getUser(AdminId);
    setGroupAdmin(respons.data);
  };

  const toggleBioMore = () => {
    setBioMore((prev) => !prev);
  };
  useEffect(() => {
    if (groupId) {
      getGroupInfo(groupId);
    }
  }, [groupId, searchParams]);

  useEffect(() => {
    if (groupInfo) {
      getAdmin(groupInfo.adminId);
    }
  }, [groupInfo, searchParams]);

  useEffect(() => {
    if (groupAdmin) {
      setLoading(false);
    }
  }, [groupAdmin, searchParams]);
  // initialy this enabled joining and leaving the group, but now its only for leaving joining reqiers agreeing to the group rules
  const toggleJoin = async () => {
    if (
      groupInfo &&
      groupInfo.isMemember == true &&
      userContext.userInfo.UserId
    ) {
      const response = await Groups.RemoveMember(
        groupInfo.id,
        userContext.userInfo.UserId
      );
      if (response.status === 200) {
        SetGroupInfo((prev) => {
          if (!prev) return prev;
          return { ...prev, isMemember: false };
        });
      }
      navigate(`/feed`);
    }
  };
  const ShowRules = () => {
    if (groupInfo?.groupRules) {
      dialogs.showtext(groupInfo?.groupRules);
    }
  };

  return (
    <>
      <div className="p-1">
        {loading && <DinoSpinner size={60} />}
        {!loading && groupInfo && !groupAdmin?.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg md:overflow-hidden w-11/12 md:w-2/3`}
            >
              <div className="relative">
                <img
                  src={groupInfo.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-6 flex items-center space-x-4">
                  <img
                    src={groupInfo.imageURL}
                    alt="Group image"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <div
                    className={`text-2xl font-bold text-left mt-5 ${colors.ButtonFont}`}
                  >
                    <Tooltip title={groupInfo.name}>
                      {groupInfo.name.slice(0, 30)}
                      {groupInfo.name.length > 30 && "..."}
                    </Tooltip>
                  </div>
                </div>
                <div className="absolute right-0 p-2 flex flex-col items-end md:mt-0  mt-9">
                  {userContext.userInfo.UserId == groupInfo.adminId && (
                    <button
                      onClick={() =>
                        navigate(`/groupSettings?groupId=${groupInfo.id}`)
                      }
                    >
                      <FaUserGear
                        className={`${colors.ButtonFont}`}
                        size={25}
                      />
                    </button>
                  )}
                  {groupInfo?.groupRules && groupInfo?.groupRules.length > 1 && (
                    <button
                      className={`${
                        colors.ElementFrame
                      } mt-2 p-2 rounded-xl flex items-center gap-2 ${
                        userContext.userInfo.UserId == groupInfo.adminId
                          ? ""
                          : "mt-20 mr-4"
                      }  `}
                      onClick={ShowRules}
                    >
                      <GiClawHammer size={25} />
                      <span> Rules</span>
                    </button>
                  )}
                </div>
              </div>
              <div className={` pt-16 px-6 pb-6 ${colors.ButtonFont}`}>
                <div className="text-center">
                  <div
                    className={`flex justify-between items-center ${
                      groupInfo && "-mt-10"
                    }`}
                  >
                    <div className=" ml-auto flex gap-3">
                      {!groupAdmin?.blockedYou &&
                        userContext.userInfo.UserId !== groupInfo.adminId && (
                          <>
                            <button
                              className={`${colors.ElementFrame} mt-2 p-2 rounded-xl flex items-center gap-2`}
                              onClick={toggleJoin}
                            >
                              <BsPersonFillDash size={25} />
                              <span> Leave</span>
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold">Description</h1>
                    </div>
                  </div>

                  <p
                    className={` text-left mt-2 ${
                      bioMore ? "h-fit" : "h-12"
                    }  overflow-hidden `}
                  >
                    {groupInfo.description}
                  </p>
                </div>
                {groupInfo.description.length > 200 && (
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GroupProfileSection;
