import { useEffect, useState } from "react";

import { GroupCreation } from "./Objects/GroupCreation";
import { colors } from "../Constants/Patterns";
import { IGroupCardListProps } from "../Types/@GroupTypes";
import { GroupCardList } from "./Objects/GroupCardList";

import { useUser } from "../CustomHooks/useUser";

const GroupSearch = () => {
  const userContext = useUser();
  const [groupFilter, setGroupFilter] = useState<string | null>(null);
  const [usersGroups, setUsersGroups] = useState<boolean>(false);

  const clearSearch = () => {
    setGroupCardListProps(initilizeProps);
    setGroupFilter(null);
    setUsersGroups(false);
  };
  const toggleUserGroups = () => {
    if (usersGroups) {
      setUsersGroups(false);
    } else {
      setUsersGroups(true);
    }
    setGroupFilter(null);
  };

  const initilizeProps: IGroupCardListProps = {
    GroupFilter: null,
    usersGroups: false,
  };
  const [groupCardListProps, setGroupCardListProps] = useState<
    IGroupCardListProps
  >(initilizeProps);

  useEffect(() => {
    setGroupCardListProps({
      GroupFilter: groupFilter,
      usersGroups: usersGroups,
    });
  }, [groupFilter, usersGroups]);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row ${
          userContext.userInfo.PermissionLevel !== "User"
            ? ""
            : "justify-center"
        }`}
      >
        {userContext.userInfo.PermissionLevel !== "User" && (
          <div className="p-8 md:w-1/4 w-full">
            <GroupCreation />
          </div>
        )}
        <div className="p-8 md:w-3/4 w-full">
          <div className="flex">
            <input
              className={`m-0.5 p-2 w-72 ${colors.TextBox}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setGroupFilter(e.target.value)}
              value={groupCardListProps.GroupFilter ?? ""}
            />
            <button className="p-3" onClick={clearSearch}>
              Clear
            </button>
            <div className="pl-8"></div>
            <button
              onClick={toggleUserGroups}
              className={`${usersGroups ? colors.Buttons : ""} rounded-xl`}
            >
              Your Groups
            </button>
          </div>
          <div>
            <GroupCardList GroupCardListProps={groupCardListProps} />
          </div>
        </div>
      </div>
    </>
  );
};
export { GroupSearch };
