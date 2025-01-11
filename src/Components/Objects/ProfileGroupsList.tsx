import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";

import { GroupCard } from "./GroupCard";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import { useSearchParams } from "react-router-dom";
import { isEqual } from "lodash";

const ProfileGroupsList = () => {
  const [searchParams] = useSearchParams();

  const userContext = useUser();
  const [loading, setLoading] = useState(true);
  const [groupCardData, setGroupCardData] = useState<ISocialGroupCard[] | null>(
    null
  );

  const [userId, setUserId] = useState<null | string>(null);

  const getSearchParams = () => {
    const _userId = searchParams.get("userId");
    if (_userId) {
      if (!isEqual(userId, _userId)) {
        setUserId(_userId);
      }
    }
  };

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);
  // get the groups the user belongs to
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
  }, [userId, userContext.userInfo.UserId, searchParams]);

  useEffect(() => {
    if (groupCardData) {
      setLoading(false);
    }
  }, [groupCardData]);

  return (
    <>
      {!loading && groupCardData && (
        <div className="grid md:grid-cols-1 grid-cols-2 gap-4">
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
