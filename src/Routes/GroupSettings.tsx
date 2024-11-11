import { useEffect, useState } from "react";
import { GroupEditComponent } from "../Components/GroupEditComponent";
import { useSearchParams } from "react-router-dom";
import { MemberEditTabList } from "../Components/MemberEditTabList";
import { isEqual } from "lodash";
import DinoSpinner from "../Spinners/DinoSpinner";

const GroupSettings = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [GroupId, setGroupId] = useState("");

  const [groupId, setgroupId] = useState<null | string>(null);

  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setgroupId(_groupId);
    } else {
      setgroupId(null);
    }
  };

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  useEffect(() => {
    if (groupId) {
      setGroupId(groupId);
    }
    if (GroupId) {
      setLoading(false);
    }
  }, [GroupId, groupId, searchParams]);

  return (
    <>
      {loading && groupId ? (
        <DinoSpinner size={30} />
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
