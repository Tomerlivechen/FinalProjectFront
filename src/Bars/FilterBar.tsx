import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { colors } from "../Constants/Patterns";
import { useSearch } from "../CustomHooks/useSearch";
import { FaSearch } from "react-icons/fa";

import { IUserSelector } from "../Types/@UserTypes";
import { IPostSelector } from "../Types/@StructureTypes";

function FilterBar() {
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);
  const searchFilter = useSearch();
  const [userSelector, setUserSelector] = useState<IUserSelector>({
    UserName: false,
    FirstName: false,
    LastName: false,
  });
  const [postSelector, setPostSelector] = useState<IPostSelector>({
    UserName: false,
    Title: false,
    KeyWords: false,
  });

  const handleSearch = () => {
    if (selectedUser) {
      searchFilter.filterUsers();
    }
    if (selectedPost) {
      searchFilter.filterPosts();
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const toggleUser = async () => {
    await setSelectedUser((prevselectedUser) => !prevselectedUser);
    await setUserSelector({
      UserName: false,
      FirstName: false,
      LastName: false,
    });
    if (selectedPost == true) {
      await setSelectedPost(false);
    }
  };
  const togglePost = async () => {
    await setSelectedPost((prevselectedPost) => !prevselectedPost);
    await setPostSelector({
      UserName: false,
      Title: false,
      KeyWords: false,
    });
    if (selectedUser == true) {
      await setSelectedUser(false);
    }
  };

  const toggleUserSelector = (key: keyof IUserSelector) => {
    setUserSelector({
      UserName: false,
      FirstName: false,
      LastName: false,
      [key]: true,
    });
    searchFilter.searchToggleFunctions.toggleUserSearch(key);
    searchFilter.searchToggleFunctions.togglePostSearch(null);
  };

  const togglePostSelector = (key: keyof IPostSelector) => {
    setPostSelector({
      UserName: false,
      Title: false,
      KeyWords: false,
      [key]: true,
    });
    searchFilter.searchToggleFunctions.togglePostSearch(key);
    searchFilter.searchToggleFunctions.toggleUserSearch(null);
  };

  return (
    <>
      <Navbar
        id="app-filter-bar"
        className={`fixed top-12 z-40 w-full md:shadow-2xl shadow-slate-800  text-black flex gap-3 ${colors.Filter} ${colors.NavText}`}
      >
        <button
          className={`${selectedUser ? colors.ActiveText : null} text-lg p-2`}
          onClick={toggleUser}
        >
          User
        </button>
        {selectedUser && (
          <>
            <button
              className={` ${
                userSelector.UserName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("UserName")}
            >
              UserName
            </button>
            <button
              className={` ${
                userSelector.FirstName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("FirstName")}
            >
              First Name
            </button>
            <button
              className={` ${
                userSelector.LastName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("LastName")}
            >
              Last Name
            </button>
          </>
        )}
        <button
          className={`${selectedPost ? colors.ActiveText : null}  text-lg p-2`}
          onClick={togglePost}
        >
          Post
        </button>
        {selectedPost && (
          <>
            <button
              className={` ${
                postSelector.UserName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("UserName")}
            >
              UserName
            </button>
            <button
              className={` ${
                postSelector.Title ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("Title")}
            >
              Title
            </button>
            <button
              className={` ${
                postSelector.KeyWords ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("KeyWords")}
            >
              Key Words
            </button>
          </>
        )}
        <div style={{ position: "absolute", left: "40%" }}>
          <input
            className="m-0.5 p-2 w-72 text-black"
            id="searchBar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => searchFilter.setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchFilter.searchValue}
          />
          <button className=" pl-3" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </Navbar>
    </>
  );
}

export default FilterBar;
