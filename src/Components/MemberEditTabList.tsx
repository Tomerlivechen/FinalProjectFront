import { useEffect, useState } from "react";
import { Groups } from "../Services/group-service";
import { IAppUserDisplay } from "../Models/UserModels";
import { colors } from "../Constants/Patterns";
import { isEqual } from "lodash";
import { MemberEditTab } from "./Objects/MemberEditTab";
import DinoSpinner from "../Spinners/DinoSpinner";

const MemberEditTabList: React.FC<{ GroupId: string }> = ({ GroupId }) => {
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(true);
  const [tempMemberList, setTempMemberList] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [memberList, setMemberList] = useState<IAppUserDisplay[] | null>(null);

  const getMembersList = async () => {
    if (groupId) {
      const response = await Groups.GetGroupMembers(groupId);
      setTempMemberList(response.data);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (GroupId && groupId == "") {
      setGroupId(GroupId);
    }
    if (groupId.length > 0 && !memberList) {
      getMembersList();
    }
    if (tempMemberList) {
      setMemberList(tempMemberList);
      setLoading(false);
    }
    if (memberList && !isEqual(memberList, tempMemberList)) {
      setMemberList(tempMemberList);
      setLoading(false);
    }
  }, [GroupId, groupId, memberList, tempMemberList]);

  const intervalTime = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      getMembersList();
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!loading && memberList ? (
        <div>
          <div
            className={`flex justify-center items-center ${colors.ActiveText}`}
          >
            Members List
          </div>
          {memberList.map((member) => (
            <div key={member.id} className="md:p-2">
              <MemberEditTab
                METProps={{ userInfo: member, socialGroupId: groupId }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <DinoSpinner size={30} />
        </div>
      )}
    </>
  );
};
export { MemberEditTabList };
