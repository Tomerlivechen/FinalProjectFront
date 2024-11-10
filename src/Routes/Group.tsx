import { useLocation,  useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupSearch } from "../Components/GroupSearch";
import GroupPage from "../Components/GroupPage";

const Group = () => {
  const [searchParams] = useSearchParams()


  const location = useLocation();
  const [listOrGroup, setListOrGroup] = useState<"list" | "group">("list");


  const [groupId,setGroupId] = useState<null|string>(null)

  useEffect(() => {
    const groupId = searchParams.get('groupId');
    if(groupId){
    setGroupId(groupId)
    }
  },[searchParams]);


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
