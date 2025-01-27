import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import { categories, colors, getFlowingPosts } from "../Constants/Patterns";

import { FaChevronDown, FaCircleUp } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { MdCloudSync } from "react-icons/md";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import SendPostComponent from "./Objects/SendPostComponent";
import { PostList } from "./Objects/PostList";
import { Posts } from "../Services/post-service";
import { IPostDisplay } from "../Models/Interaction";

import { isEqual } from "lodash";
import {
  IPostOrderProps,
  IPostSortingProps,
  PostListValues,
} from "../Types/@PostTypes";
import { NoMorePosts } from "./Objects/NoMorePosts";
import DinoSpinner from "../Spinners/DinoSpinner";

const PostFrame = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [userIdState, setUserIdState] = useState<string | null>();
  const [groupIdState, setGroupIdState] = useState<string | null>();
  const [postIdState, setPostIdState] = useState<string | null>();
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postList, setPostList] = useState<PostListValues | null>();
  const [mainPostList, setMainPostList] = useState<IPostDisplay[] | null>();
  const [catFilter, setCatFilter] = useState<number[]>([0]);
  const [userId, setUserId] = useState<null | string>();
  const [groupId, setGroupId] = useState<null | string>();
  const [postId, setPostId] = useState<null | string>();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const clearAllElements = () => {
    setLoadingPosts(true);
    setUserIdState(null);
    setGroupIdState(null);
    setPostIdState(null);
    setPostList(null);
    setMainPostList(null);
    setCatFilter([0]);
    setUserId(null);
    setGroupId(null);
    setPostId(null);
  };

  const refresh = () => {
    updatePostList();
  };

  useEffect(() => {
    clearAllElements();
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = async () => {
    const _userId = searchParams.get("userId");
    const _groupId = searchParams.get("groupId");
    const _postId = searchParams.get("postId");
    if (_groupId && !isEqual(groupId, _groupId)) {
      setGroupId(_groupId);
    } else if (!_groupId) {
      setGroupId(null);
    }
    if (_userId && !isEqual(userId, _userId)) {
      setUserId(_userId);
    } else if (!_userId) {
      setUserId(null);
    }
    if (_postId && !isEqual(postId, _postId)) {
      setPostId(_postId);
    } else if (!_postId) {
      setPostId(null);
    }
  };
  // detect what path is viewd
  useEffect(() => {
    if (location.pathname.startsWith("/profile") && userId) {
      setUserIdState(userId);
    }
    if (location.pathname.startsWith("/group") && groupId) {
      setGroupIdState(groupId);
    }
    if (location.pathname.startsWith("/feed") && postId) {
      setPostIdState(postId);
    }
    if (location.pathname.startsWith("/feed") && !postId) {
      updatePostList();
    }
  }, [location.pathname, userId, groupId, postId]);

  const [feedSort, setFeedSort] = useState({
    totalVotes: false,
    datetime: true,
    comments: false,
  });
  const [feedDirection, setFeedDirection] = useState({
    ascending: false,
    descending: true,
  });

  useEffect(() => {
    if (userIdState || groupIdState || postIdState) {
      updatePostList();
    }
  }, [userIdState, groupIdState, postIdState]);

  // detect what kind of page is viewd
  const updatePostList = async () => {
    const updatePostListIfChanged = (parsedPosts: IPostDisplay[]) => {
      if (!isEqual(parsedPosts, mainPostList)) {
        setMainPostList(parsedPosts);
      }
    };
    if (location.pathname.startsWith("/group") && groupIdState) {
      const groupPosts = await Posts.GetGroupPosts(groupIdState);
      updatePostListIfChanged(groupPosts?.data);
    } else if (location.pathname === "/feed" && !postIdState) {
      const followingPosts = await getFlowingPosts();
      updatePostListIfChanged(followingPosts);
    } else if (location.pathname.startsWith("/feed") && postIdState) {
      const PostbyId = await Posts.getPostById(postIdState);
      updatePostListIfChanged(PostbyId.data);
    } else if (location.pathname.startsWith("/profile") && userIdState) {
      const ProfilePosts = await Posts.GetAuthorPosts(userIdState);
      updatePostListIfChanged(ProfilePosts.data);
    }
  };

  useEffect(() => {
    if (mainPostList && !isEqual(mainPostList, postList?.posts)) {
      setPostList((prevPostList) => ({
        ...prevPostList,
        posts: mainPostList,
      }));
    }
  }, [mainPostList]);

  const getSoretElement = () => {
    let element: string | null;
    if (feedSort.totalVotes == true) {
      element = "totalVotes";
    } else if (feedSort.datetime == true) {
      element = "datetime";
    } else if (feedSort.comments == true) {
      element = "comments";
    } else {
      element = "datetime";
    }
    return element;
  };

  // sort and orgenize the posts list parameters
  useEffect(() => {
    if (mainPostList) {
      const sortelement = getSoretElement();
      const newPostList: PostListValues = {
        sortElement: sortelement,
        orderBy: feedDirection.ascending ? "asc" : "desc",
        posts: mainPostList,
        filter:
          Array.isArray(catFilter) &&
          catFilter.length === 1 &&
          catFilter[0] === 0
            ? null
            : catFilter,
      };
      if (!isEqual(newPostList, postList)) {
        setLoadingPosts(true);
        setPostList(newPostList);
        setLoadingPosts(false);
      }
      setLoadingPosts(false);
    }
  }, [feedDirection, feedSort, mainPostList, catFilter, postList]);

  useEffect(() => {
    if (postList) {
      setLoadingPosts(false);
    } else if (mainPostList && mainPostList.length < 0) {
      setLoadingPosts(false);
    }
  }, [postList, mainPostList]);

  const toggleSort = (type: "totalVotes" | "datetime" | "comments") => {
    setFeedSort({
      totalVotes: false,
      datetime: false,
      comments: false,
      [type]: true,
    });
  };
  const toggleDirection = (type: "ascending" | "descending") => {
    setFeedDirection({
      ascending: false,
      descending: false,
      [type]: true,
    });
  };

  const IconSortButton: React.FC<IPostSortingProps> = (e) => {
    return (
      <button
        className={`${
          !e.activeHook
            ? colors.ButtonFont + " cursor-pointer"
            : colors.ButtonFontDisabled
        }`}
        disabled={e.activeHook}
        onClick={() => toggleSort(e.type)}
      >
        <Tooltip title={e.tooltip}>
          <e.icon size={24} />
        </Tooltip>
      </button>
    );
  };

  const IconDirectionButton: React.FC<IPostOrderProps> = (e) => {
    return (
      <button
        className={`${
          !e.activeHook
            ? colors.ButtonFont + " cursor-pointer"
            : colors.ButtonFontDisabled
        }`}
        disabled={e.activeHook}
        onClick={() => toggleDirection(e.type)}
      >
        <Tooltip title={e.tooltip}>
          <e.icon size={24} />
        </Tooltip>
      </button>
    );
  };

  const handleCheckboxChange = (categoryId: number) => {
    setCatFilter((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCatigoryFilter = () => {
    if (openFilter) {
      setOpenFilter(false);
      updatePostList();
    } else {
      setOpenFilter(true);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className={`${colors.ElementFrame} h-14 w-fit flex justify-between md:p-4 pb-4  gap-4 rounded-b-xl `}
        >
          <IconSortButton
            icon={FaCircleUp}
            activeHook={feedSort.totalVotes}
            type="totalVotes"
            tooltip="Sort by popular"
          />
          <IconSortButton
            icon={IoSparkles}
            activeHook={feedSort.datetime}
            type="datetime"
            tooltip="Sort by recent"
          />
          <IconSortButton
            icon={GoCommentDiscussion}
            activeHook={feedSort.comments}
            type="comments"
            tooltip="Sort by comments"
          />

          <div
            className={` w-32 ${colors.ActiveText} text-lg flex items-center justify-center `}
          >
            Posts
          </div>
          <button onClick={() => refresh()}>
            <Tooltip title="Sync">
              <MdCloudSync size={26} />
            </Tooltip>
          </button>
          <IconDirectionButton
            icon={FaAngleDoubleUp}
            activeHook={feedDirection.ascending}
            type="ascending"
            tooltip="Sort ascending"
          />
          <IconDirectionButton
            icon={FaAngleDoubleDown}
            activeHook={feedDirection.descending}
            type="descending"
            tooltip="Sort descending"
          />
        </div>

        <button
          className={`font-bold mb-2 ${colors.ElementFrame} md:w-[400px] w-[370px]`}
          onClick={() => toggleCatigoryFilter()}
        >
          {" "}
          <div className="flex items-center justify-center ">
            {" "}
            Select Category Filter <FaChevronDown
              size={24}
              className="p-1"
            />{" "}
          </div>
        </button>
        {openFilter && (
          <>
            <div
              className={`grid grid-cols-2 gap-1 ${colors.ElementFrame} md:w-[400px] w-[370px]`}
            >
              {categories.map((category) => (
                <label
                  key={category.id}
                  className=" flex items-center space-x-2 px-3"
                >
                  <input
                    type="checkbox"
                    value={category.id}
                    checked={catFilter.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  <span className={`${colors.ActiveText} font-bold `}>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}
        {!userIdState && <SendPostComponent />}
        <div className="w-full">
          {mainPostList && mainPostList?.length < 1 && (
            <div>
              <NoMorePosts />
            </div>
          )}
          {!loadingPosts && postList && <PostList postListValue={postList} />}
          {loadingPosts && !postList && (
            <div className="flex ml-40 ">
              <DinoSpinner size={50} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { PostFrame };
