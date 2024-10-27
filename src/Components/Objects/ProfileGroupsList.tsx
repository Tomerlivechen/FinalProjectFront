import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";

import { GroupCard } from "./GroupCard";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import { useParams } from "react-router-dom";

const ProfileGroupsList = () => {
  const { userId } = useParams();
  const userContext = useUser();
  const [loading, setLoading] = useState(true);
  const [groupCardData, setGroupCardData] = useState<ISocialGroupCard[] | null>(
    null
  );

  const GetUserGroups = async (userId: string) => {
    if (userContext.userInfo.UserId) {
      const response = await auth.GetUsersGroups(userId);
      setGroupCardData(response.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (userId) {
      GetUserGroups(userId);
    } else if (userContext.userInfo.UserId) {
      GetUserGroups(userContext.userInfo.UserId);
    }
  }, []);

  useEffect(() => {
    if (groupCardData) {
      setLoading(false);
    }
  }, [groupCardData]);

  return (
    <>
      {!loading && groupCardData && (
        <div className="flex flex-wrap">
          {groupCardData.map((group) => (
            <div className="p-2" key={group.id}>
              <GroupCard GroupCardData={group} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { ProfileGroupsList };
