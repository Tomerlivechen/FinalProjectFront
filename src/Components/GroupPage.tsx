import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Groups } from "../Services/group-service";

import { UserTabList } from "./Objects/UserTabList";

import { IAppUserDisplay } from "../Models/UserModels";
import { ISocialGroupDisplay } from "../Models/SocialGroup";
import GroupProfileSection from "./Objects/GroupProfileSection";
import ResizableFrame from "./Objects/ResizableFrame";
import { PostFrame } from "./PostFrame";
import { isEqual } from "lodash";
import { updateScale } from "../Constants/Patterns";

const GroupPage = () => {
  const [searchParams] = useSearchParams();
  const [groupId, setGroupId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
    setGroupState(null);
  }, [searchParams]);

  const getSearchParams = () => {
    const _groupId = searchParams.get("groupId");
    if (_groupId) {
      if (!isEqual(groupId, _groupId)) {
        setGroupId(_groupId);
      }
    }
  };
  useEffect(() => {
    document.body.style.zoom = "1";
    updateScale(0.7);
  }, [location]);
  const [groupState, setGroupState] = useState<ISocialGroupDisplay | null>(
    null
  );
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [MemberList, setMemberList] = useState<IAppUserDisplay[] | null>(null);

  const GetMembers = async (groupId: string) => {
    const response = await Groups.GetGroupMembers(groupId);
    setMemberList(response.data);
  };

  const GetGroupInfo = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setGroupState(response.data);
  };
  useEffect(() => {
    if (groupId) {
      GetMembers(groupId);
      GetGroupInfo(groupId);
    }
  }, [groupId, searchParams]);

  useEffect(() => {
    if (MemberList) {
      setLoadingUsers(false);
    }
  }, [MemberList]);

  return (
    <>
      <div className="flex flex-wrap overflow-hidden w-full">
        <div className="w-full md:w-1/12 px-2"></div>
        <div className="w-full md:w-11/12 px-2">
          <div className=" w-full px-2 min-w-[40rem]  sm:w-[40rem] md:w-[55rem] lg:w-[72rem] xl:w-[99rem] ">
            <GroupProfileSection />
          </div>
          <div className="flex px-2 min-w-[40rem] sm:w-[40rem] md:w-[55rem] lg:w-[72rem] xl:w-[99rem] ">
            <div className="flex flex-col md:flex-row justify-between w-fit">
              <div className="hidden lg:block lg:w-fit pl-2 pr-2 h-1/2">
                {!loadingUsers && MemberList && (
                  <ResizableFrame
                    title={"Members"}
                    show={true}
                    tailwindProps=" w-fit h-full"
                  >
                    <UserTabList users={MemberList} />
                  </ResizableFrame>
                )}
              </div>
              <div className="w-fit lg:w-fit pl-2 pr-2">
                <PostFrame />
              </div>
              {groupState?.groupRules && groupState?.groupRules.length > 1 && (
                <div className="hidden xl:block lg:w-[20rem] pl-2 ">
                  <ResizableFrame
                    title={"Rules"}
                    show={true}
                    tailwindProps="w-fit h-full"
                  >
                    {groupState?.groupRules}
                  </ResizableFrame>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
