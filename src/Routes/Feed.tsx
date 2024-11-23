import { useEffect, useState } from "react";
import ResizableFrame from "../Components/Objects/ResizableFrame";
import UserLane from "../Components/UserLane";
import { PostFrame } from "../Components/PostFrame";
import { useSearchParams } from "react-router-dom";
import { IPostDisplay } from "../Models/Interaction";
import { Posts } from "../Services/post-service";
import PostView from "../Components/Objects/PostView";
import { ProfileGroupsList } from "../Components/Objects/ProfileGroupsList";
import { InteractingUsersLists } from "../Components/InteractingUsersLists";
import { isEqual } from "lodash";
import DinoSpinner from "../Spinners/DinoSpinner";
import { MotionFrame } from "../Constants/Patterns";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);

  const [postId, setPostId] = useState<null | string>(null);

  const getSearchParams = () => {
    const _postId = searchParams.get("postId");
    if (_postId && !isEqual(postId, _postId)) {
      setPostId(_postId);
      getSinglePost(_postId);
    } else {
      setPostId(null);
      setSingularPost(null);
    }
  };

  useEffect(() => {
    getSearchParams();
    setLoading(true);
    setSingularPost(null);
  }, [searchParams]);

  const getSinglePost = async (postParams: string | null) => {
    if (postParams) {
      const SinglePost = await Posts.getPostById(postParams);
      setSingularPost(SinglePost.data);
    } else if (postId) {
      const SinglePost = await Posts.getPostById(postId);
      setSingularPost(SinglePost.data);
    }
  };

  useEffect(() => {
    if (postId) {
      getSinglePost(null);
    }
  }, [postId]);

  useEffect(() => {
    const _postId = searchParams.get("postId");
    if (postId && singularPost) {
      setLoading(false);
    } else if (!_postId) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [postId, singularPost]);

  return (
    <>
      <MotionFrame>
        <div className="flex  ">
          <div className="flex flex-wrap gap-8 ">
            <div className="hidden lg:block lg:w-fit xl:w-fit  pl-2">
              <UserLane />
              <ResizableFrame
                whidth={"auto"}
                title={"Groups"}
                show={true}
                overflowX={false}
                tailwindProps="h-auto"
              >
                <ProfileGroupsList />
              </ResizableFrame>
            </div>
            <div className="w-full sm:w-full md:w-1/2 lg:w-4/12 xl:w-4/12  pr-2">
              <div>
                {loading && <DinoSpinner size={60} />}
                {!loading && !postId && <PostFrame />}
                {!loading && postId && singularPost && (
                  <PostView {...singularPost} />
                )}
              </div>
            </div>
            <div className="flex  justify-center  ">
              <div className=" md:block hidden w-fit  pr-2 ">
                <InteractingUsersLists />
              </div>
            </div>
          </div>
        </div>
      </MotionFrame>
    </>
  );
};

export default Feed;
