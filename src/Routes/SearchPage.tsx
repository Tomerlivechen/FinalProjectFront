import { useEffect, useState } from "react";
import { useSearch } from "../CustomHooks/useSearch";
import UserCard from "../Components/Objects/UserCard";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import SearchTitleComponent from "../Components/SearchTitleComponent";
import PostCard from "../Components/Objects/PostCard";
import ElementFrame from "../Constructors/ElementFrame";
import { colors } from "../Constants/Patterns";
import { FaLongArrowAltUp } from "react-icons/fa";

function SearchPage() {
  const searchContext = useSearch();
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    const { userSearch, postSearch } = searchContext;

    if (Object.values(userSearch).some((value) => value)) {
      setActiveSearch("user");
    } else if (Object.values(postSearch).some((value) => value)) {
      setActiveSearch("post");
    }
  }, [searchContext.userSearch, searchContext.postSearch]);

  useEffect(() => {
    searchContext.fillLists();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-11">
        <SearchTitleComponent />
      </div>

      {searchContext.loadingData && (
        <div className=" flex flex-col items-center">
          <ClimbBoxSpinner /> <br />
        </div>
      )}
      {!activeSearch && (
        <div
          className={` absolute top-12 p-2 flex flex-row ${colors.ActiveText} animate-bounce`}
        >
          <FaLongArrowAltUp />
          Select Search fields <FaLongArrowAltUp />
        </div>
      )}
      <div className=" flex flex-col items-center">
        <ElementFrame tailwind={`h-fit w-fit `} padding="2" overflowY="auto">
          {activeSearch == "user" && (
            <div className=" flex flex-col items-center">
              {searchContext.filterUserList.map((user) => (
                <>
                  <UserCard key={user.id} UserDisplay={user} />
                  <hr />
                </>
              ))}
            </div>
          )}
          {activeSearch == "post" && (
            <div className=" flex flex-col items-center">
              {searchContext.filterPostList.map((post) => (
                <>
                  <div className="pt-5 ">
                    <PostCard key={post.id} {...post} />
                  </div>
                </>
              ))}
            </div>
          )}
        </ElementFrame>
      </div>
    </>
  );
}

export { SearchPage };
