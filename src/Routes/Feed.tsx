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
import { InteractingUsersLists } from "../Components/InteractingUsersLists";

const Feed = () => {
  const { postId } = useParams();
  const userContext = useUser();
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);

  useEffect(() => {
    const getSinglePost = async () => {
      if (postId) {
        const SinglePost = await Posts.getPostById(postId);
        setSingularPost(SinglePost.data);
      }
    };
    getSinglePost();
  }, [postId]);

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

          <div className=" hidden md:block w-fit pr-2 pl-2">
            <>
              <InteractingUsersLists />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
