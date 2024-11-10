import { useEffect, useState } from "react";

import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";

import { GroupEditComponent } from "../Components/GroupEditComponent";
import {  useSearchParams } from "react-router-dom";
import { MemberEditTabList } from "../Components/MemberEditTabList";

const GroupSettings = () => {
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState(true);
  const [GroupId, setGroupId] = useState("");


  const [groupId,setgroupId] = useState<null|string>(null)

  useEffect(() => {
    const groupId = searchParams.get('groupId');
    if(groupId){
      setgroupId(groupId)
    }
  },[searchParams]);


  useEffect(() => {
    if (groupId) {
      setGroupId(groupId);
    }
    if (GroupId) {
      setLoading(false);
    }
  }, [GroupId, groupId]);

  return (
    <>
      {loading && groupId ? (
        <ClimbBoxSpinner />
      ) : (
        <>
          <div className="flex justify-center items-start space-x-4 mt-8">
            <GroupEditComponent />
            <MemberEditTabList GroupId={GroupId} />
          </div>
        </>
      )}
    </>
  );
};

export default GroupSettings;
