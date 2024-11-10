import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupSearch } from "../Components/GroupSearch";
import GroupPage from "../Components/GroupPage";
import { isEqual } from "lodash";

const Group = () => {
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const [listOrGroup, setListOrGroup] = useState<"list" | "group">("list");

  const [groupId, setGroupId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setGroupId(_groupId);
    } else {
      setGroupId(null);
    }
  };

  useEffect(() => {
    if (groupId) {
      setListOrGroup("group");
    } else {
      setListOrGroup("list");
    }
  }, [groupId, location, searchParams]);

  return (
    <>
      {listOrGroup == "list" && <GroupSearch />}
      {listOrGroup == "group" && <GroupPage />}
    </>
  );
};
export { Group };
