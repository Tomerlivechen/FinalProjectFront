import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";
import ElementFrame from "../../Constructors/ElementFrame";
import { Tooltip } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { colors } from "../../Constants/Patterns";
import { useUser } from "../../CustomHooks/useUser";
import { Groups } from "../../Services/group-service";
import { useNavigate } from "react-router-dom";
import { IConfirmJoinGoupProps } from "../../Types/@GroupTypes";
import { dialogs } from "../../Constants/AlertsConstant";
import DinoSpinner from "../../Spinners/DinoSpinner";

const GroupCard: React.FC<{
  GroupCardData: ISocialGroupCard;
}> = ({ GroupCardData }) => {
  const [GroupCard, setGroupCard] = useState<ISocialGroupCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalProps, setModalProps] = useState<IConfirmJoinGoupProps | null>(
    null
  );
  const userContext = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (GroupCardData) {
      setGroupCard(GroupCardData);
    }
  }, []);

  useEffect(() => {
    if (GroupCard) {
      setLoading(false);
      setModalProps({
        title: `Join Group ${GroupCard?.name}`,
        text: `
    Description: <br/> ${GroupCard?.description} <br/><br/>
    Rules: <br/> ${GroupCard?.groupRules} <br/><br/>
    By joining this group you agree to all the rules above.
  `,
        buttonText: "I confirm",
        groupId: `${GroupCard?.id}`,
      });
    }
  }, [GroupCard]);

  const deleteGroup = async () => {
    if (GroupCard) {
      await Groups.DeleteGroup(GroupCard.id);
    }
  };

  const goToGroup = () => {
    if (GroupCard?.isMemember) {
      navigate(`/group?groupId=${GroupCard?.id}`);
    }
  };

  const OpenJoinGroup = async () => {
    if (modalProps) {
      const respons = await dialogs.ConfirmJoinGroup(modalProps);
      if (respons) {
        navigate(`/group?groupId=${GroupCard?.id}`);
      }
    }
  };

  return (
    <>
      {loading && <DinoSpinner size={30} />}
      {!loading && GroupCard && (
        <>
          <div className="hover:cursor-pointer" onClick={() => goToGroup()}>
            <ElementFrame
              tailwind={`h-40 w-40 border-2 border-y-amber-700  border-x-teal-500 flex flex-col items-center justify-center `}
            >
              {(userContext.userInfo.IsAdmin == "true" ||
                userContext.userInfo.UserId == GroupCard.admin.id) && (
                <div className="absolute top-1 right-0 hover:cursor-pointer">
                  <button
                    className={`${colors.CommentColors} rounded-xl`}
                    onClick={() => deleteGroup()}
                  >
                    <Tooltip title="delete">
                      <IoClose size={18} />
                    </Tooltip>
                  </button>
                </div>
              )}
              <div className="h-1/2 w-full relative overflow-hidden">
                <img
                  src={GroupCard.banerImageURL}
                  className="w-full h-full object-cover"
                />
              </div>
              <Tooltip title={GroupCard.name}>
                {
                  <div className="font-bold">
                    {GroupCard.name.slice(0, 30)}
                    {GroupCard.name.length > 30 && "..."}
                  </div>
                }
              </Tooltip>

              <div className="flex flex-col justify-between h-2/4">
                {GroupCard.isMemember ? (
                  <div
                    className={`font-bold ${colors.ElementFrame}  p-2 rounded-xl mt-auto mb-4`}
                  >
                    You are a member
                  </div>
                ) : (
                  <button
                    className={`font-bold ${colors.ElementFrame} border-2 border-amber-700 p-2 rounded-xl mt-auto mb-4`}
                    onClick={OpenJoinGroup}
                  >
                    More
                  </button>
                )}
              </div>
            </ElementFrame>
          </div>
        </>
      )}
    </>
  );
};

export { GroupCard };
