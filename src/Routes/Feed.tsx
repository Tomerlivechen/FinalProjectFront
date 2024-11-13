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

const Feed = () => {
  const [searchParams] = useSearchParams();
 const [loading , setLoading] = useState(true);
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);

  const [postId, setPostId] = useState<null | string>(null);


  const getSearchParams = () => {
    const _postId = searchParams.get("postId");
    if (_postId && !isEqual(postId, _postId)) {
      setPostId(_postId);
      getSinglePost(_postId)
    } else {
      setPostId(null);
      setSingularPost(null)
    }
  };

  useEffect(() => {
    getSearchParams();
  }, [searchParams.toString()]);

const getSinglePost = async (postParams : string|null) => {
  if (postParams) {
    const SinglePost = await Posts.getPostById(postParams);
    setSingularPost(SinglePost.data);
  }
    else  if (postId) {
        const SinglePost = await Posts.getPostById(postId);
        setSingularPost(SinglePost.data);
      }
    };

  useEffect(() => {
    if (postId){
    getSinglePost(null);
    }
  }, [postId]);

useEffect(() => {
  const _postId = searchParams.get("postId");
if (postId && singularPost){
  setLoading(false);
}
else if (!_postId){
  setLoading(false);
}
else {
  setLoading(true)
}

},[postId,singularPost]);



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
              tailwindProps="h-auto"
            >
              <ProfileGroupsList />
            </ResizableFrame>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-4/12 xl:w-4/12 pl-2 pr-2">
            <div>
              {loading && <DinoSpinner size={60} />}
              {!loading && !postId && <PostFrame UserList={[]} />}
              {!loading && postId && singularPost && <PostView {...singularPost} />}
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
