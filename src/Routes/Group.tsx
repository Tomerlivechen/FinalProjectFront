import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupSearch } from "../Components/GroupSearch";
import GroupPage from "../Components/GroupPage";

const Group = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const [listOrGroup, setListOrGroup] = useState<"list" | "group">("list");

  useEffect(() => {
    if (groupId) {
      setListOrGroup("group");
    } else {
      setListOrGroup("list");
    }
  }, [groupId, location]);

  return (
    <>
      {listOrGroup == "list" && <GroupSearch />}
      {listOrGroup == "group" && <GroupPage />}
    </>
  );
};
export { Group };
