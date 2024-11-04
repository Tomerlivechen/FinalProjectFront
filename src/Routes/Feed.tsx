import { useEffect, useState } from "react";
import ResizableFrame from "../Components/Objects/ResizableFrame";
import { UserTabList } from "../Components/Objects/UserTabList";
import UserLane from "../Components/UserLane";
import { PostFrame } from "../Components/PostFrame";
import { useParams } from "react-router-dom";
import { IPostDisplay } from "../Models/Interaction";
import { Posts } from "../Services/post-service";
import PostView from "../Components/Objects/PostView";
import { ProfileGroupsList } from "../Components/Objects/ProfileGroupsList";
import { IAppUserDisplay } from "../Models/UserModels";
import { Chat } from "../Services/chat-service";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import { isEqual } from "lodash";
import { colors } from "../Constants/Patterns";
import ClipSpinner from "../Spinners/ClipSpinner";

const Feed = () => {
  const { postId } = useParams();
  const userContext = useUser();
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);
  const [tempFollowingUsers, setTempFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [tempChattingUsers, setTempChattingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [followingUsers, setFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [chattingUsers, setChattingUsers] = useState<IAppUserDisplay[] | null>(
    null
  );
  useEffect(() => {
    const getSinglePost = async () => {
      if (postId) {
        const SinglePost = await Posts.getPostById(postId);
        setSingularPost(SinglePost.data);
      }
    };
    getSinglePost();
  }, [postId]);

  useEffect(() => {}, []);

  const intervalTime = 5000;
  useEffect(() => {
    if (userContext.userInfo.UserId) {
      const interval = setInterval(() => {
        getInteractingUsersLists();
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [userContext.userInfo.UserId]);

  const getInteractingUsersLists = async () => {
    if (userContext.userInfo.UserId) {
      const fRespons = await auth.GetUsersFollowing(
        userContext.userInfo.UserId
      );
      const response = await Chat.GetNotFollowingChats();
      setTempChattingUsers(response.data);
      setTempFollowingUsers(fRespons.data);
    }
  };

  useEffect(() => {
    if (tempFollowingUsers) {
      if (!isEqual(tempFollowingUsers, followingUsers)) {
        setFollowingUsers(tempFollowingUsers);
      }
    }
    if (tempChattingUsers) {
      if (!isEqual(tempChattingUsers, chattingUsers)) {
        setChattingUsers(tempChattingUsers);
      }
    }
  }, [chattingUsers, followingUsers, tempChattingUsers, tempFollowingUsers]);

  return (
    <>
      <div className="flex  ">
        <div className="w-16 "></div>
        <div className="flex flex-wrap w-11/12 justify-between ">
          <div className="hidden lg:block lg:w-fit xl:w-fit pr-2 pl-2">
            <UserLane />
            <ResizableFrame
              whidth={"auto"}
              title={"Groups"}
              show={true}
              overflowX={false}
              tailwindProps="  h-auto"
            >
              <ProfileGroupsList />
            </ResizableFrame>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-4/12 xl:w-4/12 pl-2 pr-2">
            <div>
              {!postId && <PostFrame UserList={[]} />}
              {postId && singularPost && <PostView {...singularPost} />}
            </div>
          </div>

          <div className=" hidden md:block md:w-1/2 lg:w-fit xl:w-fit pr-2 pl-2">
            <>
              <ResizableFrame
                whidth={"100%"}
                title={"People"}
                show={true}
                tailwindProps=" h-auto "
              >
                <div className={`${colors.ActiveText} text-center`}>
                  Following
                </div>
                {!followingUsers && (
                  <div className=" flex items-center justify-center">
                    <ClipSpinner />
                  </div>
                )}
                {followingUsers && <UserTabList users={followingUsers} />}

                <div className={`${colors.ActiveText} text-center`}>
                  Open Chats
                </div>
                {!chattingUsers && (
                  <div className=" flex items-center justify-center">
                    <ClipSpinner />
                  </div>
                )}
                {chattingUsers && <UserTabList users={chattingUsers} />}
              </ResizableFrame>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
