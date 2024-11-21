import { useEffect, useState } from "react";
import { Navbar, Tooltip } from "react-bootstrap";
import { colors } from "../Constants/Patterns";
import { useSearch } from "../CustomHooks/useSearch";
import { FaSearch, FaUserTag } from "react-icons/fa";

import { FaKey, FaUser } from "react-icons/fa6";
import { AiOutlineUserDelete, AiOutlineUsergroupDelete } from "react-icons/ai";
import { MdOutlineTitle } from "react-icons/md";
import { RiSignpostFill } from "react-icons/ri";
import { TbArrowsDownUp } from "react-icons/tb";
import { IPostSelector, IUserSelector } from "../ContextAPI/SearchContext";

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
    Voted: false,
  });
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    if (selectedUser) {
      searchFilter.filterUsers();
    }
    if (selectedPost) {
      searchFilter.filterPosts();
    }
  };

  useEffect(() => {
    if (selectedUser) {
      if (
        userSelector.FirstName ||
        userSelector.LastName ||
        userSelector.UserName
      ) {
        setSearchActive(true);
      } else {
        setSearchActive(false);
      }
    }
    if (selectedPost) {
      if (
        postSelector.KeyWords ||
        postSelector.Title ||
        postSelector.UserName ||
        postSelector.Voted
      ) {
        setSearchActive(true);
      } else {
        setSearchActive(false);
      }
    }
  }, [
    postSelector.Voted,
    postSelector.KeyWords,
    postSelector.Title,
    postSelector.UserName,
    selectedPost,
    selectedUser,
    userSelector.FirstName,
    userSelector.LastName,
    userSelector.UserName,
  ]);

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
      Voted: false,
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
      Voted: false,
      [key]: true,
    });
    searchFilter.searchToggleFunctions.togglePostSearch(key);
    searchFilter.searchToggleFunctions.toggleUserSearch(null);
  };

  return (
    <>
      <Navbar
        id="app-filter-bar"
        className={`fixed top-12 z-30 w-full shadow-2xl shadow-slate-800 text-black flex gap-3 ${colors.Filter} ${colors.NavText}`}
      >
        <button
          className={`${selectedUser ? colors.ActiveText : null} text-lg p-2`}
          onClick={toggleUser}
        >
          <Tooltip title="User">
            <FaUser className="md:hidden" size={24} />
            <p className="hidden md:block">User</p>
          </Tooltip>
        </button>
        {selectedUser && (
          <>
            <button
              className={` ${
                userSelector.UserName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("UserName")}
            >
              <Tooltip title="UserName">
                <FaUserTag className="md:hidden" size={20} />
                <p className="hidden md:block">UserName</p>
              </Tooltip>
            </button>
            <button
              className={` ${
                userSelector.FirstName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("FirstName")}
            >
              <Tooltip title="First Name">
                <AiOutlineUserDelete className="md:hidden" size={20} />
                <p className="hidden md:block">First Name</p>
              </Tooltip>
            </button>
            <button
              className={` ${
                userSelector.LastName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => toggleUserSelector("LastName")}
            >
              <Tooltip title="Last Name">
                <AiOutlineUsergroupDelete className="md:hidden" size={20} />
                <p className="hidden md:block">Last Name</p>
              </Tooltip>
            </button>
          </>
        )}
        <button
          className={`${selectedPost ? colors.ActiveText : null}  text-lg p-2`}
          onClick={togglePost}
        >
          <Tooltip title="Post">
            <RiSignpostFill className="md:hidden" size={28} />
            <p className="hidden md:block">Post</p>
          </Tooltip>
        </button>
        {selectedPost && (
          <>
            <button
              className={` ${
                postSelector.UserName ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("UserName")}
            >
              <Tooltip title="UserName">
                <FaUserTag className="md:hidden" size={20} />
                <p className="hidden md:block">UserName</p>
              </Tooltip>
            </button>
            <button
              className={` ${
                postSelector.Title ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("Title")}
            >
              <Tooltip title="Title">
                <MdOutlineTitle className="md:hidden" size={20} />
                <p className="hidden md:block">Title</p>
              </Tooltip>
            </button>
            <button
              className={` ${
                postSelector.KeyWords ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => togglePostSelector("KeyWords")}
            >
              <Tooltip title="Key Words">
                <FaKey className="md:hidden" size={18} />
                <p className="hidden md:block">Key Words</p>
              </Tooltip>
            </button>
            <button
              className={` ${
                postSelector.Voted ? colors.ActiveText : null
              } p-1 mt-1 text-sm`}
              onClick={() => {
                togglePostSelector("Voted");
                handleSearch();
              }}
            >
              <Tooltip title="Voted on">
                <TbArrowsDownUp className="md:hidden" size={18} />
                <p className="hidden md:block">Voted on</p>
              </Tooltip>
            </button>
          </>
        )}
        {!searchActive && (
          <div
            className={`animate-pulse ${colors.ActiveText} pt-2 text-xs md:text-sm text-wrap lg:text-base`}
          >
            <p> Select Search Category and Subcategory</p>
          </div>
        )}
        <div className="absolute md:left-[40%] md:center-auto left-auto right-4">
          <input
            className="m-0.5 p-2 w-20 md:w-72 text-black"
            id="searchBar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => searchFilter.setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchFilter.searchValue}
            disabled={!searchActive}
          />
          <button className=" pl-3" onClick={handleSearch}>
            {searchActive && <FaSearch />}
          </button>
        </div>
      </Navbar>
    </>
  );
}

export default FilterBar;
