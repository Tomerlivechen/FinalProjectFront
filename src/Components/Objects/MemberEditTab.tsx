import { useEffect, useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";
import ElementFrame from "../../Constructors/ElementFrame";
import { useNavigate } from "react-router-dom";
import { colors } from "../../Constants/Patterns";
import { MdPersonOff } from "react-icons/md";
import { Groups } from "../../Services/group-service";
import ClipSpinner from "../../Spinners/ClipSpinner";
import { IMemberEditTabProps } from "../../Types/@GroupTypes";

const MemberEditTab: React.FC<{ METProps: IMemberEditTabProps }> = ({
  METProps,
}) => {
  const navagate = useNavigate();
  const [userData, setUserData] = useState<IAppUserDisplay | null>(null);
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (METProps && !userData) {
      setUserData(METProps.userInfo);
      setGroupId(METProps.socialGroupId);
    }
    if (userData && groupId) {
      setLoading(false);
    }
  }, [userData, groupId, METProps]);

  const deleteUser = async () => {
    if (userData) {
      await Groups.RemoveMember(groupId, userData.id);
    }
  };

  return (
    <>
      {!loading && userData && !userData.blockedYou ? (
        <ElementFrame height="62px" width="200px" padding="0">
          <div className={`flex `}>
            <img
              className="rounded-full border-2 h-14 w-14 shadow-2xl p-1 "
              src={userData.imageURL}
              onClick={() => navagate(`/profile/${userData.id}`)}
              aria-description={`Profile picture of ${userData.first_Name} ${userData.last_Name}`}
            />

            <div
              className={`col-span-4 justify-center font-extrabold p-4 flex items-center gap-8 ${colors.ButtonFont}`}
            >
              {userData.userName}
              <button
                className="flex items-center"
                onClick={() => deleteUser()}
              >
                <MdPersonOff size={24} />
              </button>
            </div>
            <div className=" ml-auto col-span-4 font-extrabold p-3 flex gap-3"></div>
          </div>
        </ElementFrame>
      ) : null}
      {loading && <ClipSpinner />}
    </>
  );
};

export { MemberEditTab };
