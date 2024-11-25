import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { GroupCard } from "./GroupCard";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import { isEqual } from "lodash";
import { IGroupCardListProps } from "../../Types/@GroupTypes";

const GroupCardList: React.FC<{
  GroupCardListProps: IGroupCardListProps;
}> = ({ GroupCardListProps }) => {
  const userContext = useUser();
  const [loading, setLoading] = useState(true);
  const [groupCardData, setGroupCardData] = useState<ISocialGroupCard[] | null>(
    null
  );
  const [filteredGroupCardData, setFilteredGroupCardData] = useState<
    ISocialGroupCard[] | null
  >(null);
  const [groupFilter, setGroupFilter] = useState<string | null>(null);
  const [, setuserGroup] = useState(false);

  // gets all groups from database
  const GetGroupCards = async () => {
    const response = await Groups.GetGroups();
    setGroupCardData(response.data);
  };
  // gest all groups user is in
  const GetUserGroups = async () => {
    if (userContext.userInfo.UserId) {
      const response = await auth.GetUsersGroups(userContext.userInfo.UserId);
      setGroupCardData(response.data);
    }
  };

  useEffect(() => {
    getGroupCards();
  }, [GroupCardListProps.GroupFilter, GroupCardListProps.usersGroups]);

  // detremsains which groups to get from database acording to user input

  const getGroupCards = async () => {
    if (
      GroupCardListProps.GroupFilter?.length &&
      GroupCardListProps.GroupFilter.length > 1 &&
      !GroupCardListProps.usersGroups
    ) {
      await GetGroupCards();
      setGroupFilter(GroupCardListProps.GroupFilter);
    } else if (GroupCardListProps.usersGroups) {
      await GetUserGroups();
      setGroupFilter(GroupCardListProps.GroupFilter);
      setuserGroup(GroupCardListProps.usersGroups);
    } else if (
      (!GroupCardListProps.GroupFilter ||
        GroupCardListProps.GroupFilter.length < 1) &&
      !GroupCardListProps.usersGroups
    ) {
      await GetGroupCards();
      setGroupFilter(GroupCardListProps.GroupFilter);
      setuserGroup(GroupCardListProps.usersGroups);
    }
  };

  // refershes groups every 10 seconds

  const intervalTime = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      getGroupCards();
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  // filter groups by user input
  useEffect(() => {
    if (groupCardData && groupFilter) {
      if (groupFilter.length > 0) {
        const filtered = groupCardData.filter((card) =>
          card.name.toLowerCase().includes(groupFilter.toLowerCase())
        );
        if (!isEqual(filtered, filteredGroupCardData)) {
          setFilteredGroupCardData(filtered);
          setLoading(false);
        }
      }
    } else if (!isEqual(groupCardData, filteredGroupCardData)) {
      setFilteredGroupCardData(groupCardData);
      setLoading(false);
    }
  }, [groupCardData, groupFilter]);

  return (
    <>
      {!loading && filteredGroupCardData && (
        <div className="flex flex-wrap">
          {filteredGroupCardData.map((group) => (
            <div className="p-2" key={group.id}>
              <GroupCard GroupCardData={group} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { GroupCardList };
