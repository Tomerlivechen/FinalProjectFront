import { useContext, useEffect, useState } from "react";
import { Navbar, Tooltip } from "react-bootstrap";
import { ThemeContext } from "../ContextAPI/ThemeContext";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { colors, updateScale } from "../Constants/Patterns";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";
import FilterBar from "./FilterBar";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { NotificationAlert } from "../Components/Objects/NotificationAlert";
import { FaPeopleGroup } from "react-icons/fa6";
import { AppLogo } from "../Components/Objects/AppLogo";

import { GiChatBubble } from "react-icons/gi";
import { InteractingUsersLists } from "../Components/InteractingUsersLists";
import { useUser } from "../CustomHooks/useUser";
import { MdHelp } from "react-icons/md";
function NavBar() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [chatFrame, setChatFrame] = useState(false);
  const location = useLocation();
  const { Theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedin, logout } = useContext(LoggedInContext);
  const [notFeedOrSearch, setNotFeedOrSearch] = useState(false);
  const userinfo = useUser();
  const handelLogout = () => {
    logout();
    navigate("/");
  };
  const handelsearch = () => {
    setFilter((prevfilter) => !prevfilter);
    if (!filter) {
      navigate("search");
    }
    if (filter) {
      navigate("/");
    }
  };
  useEffect(() => {
    document.body.style.zoom = "1";
    updateScale(0.7);
  }, [location]);

  useEffect(() => {
    if (location.pathname != "/search") {
      setFilter(false);
    } else {
      setFilter(true);
    }
    if (location.pathname === "/feed" || location.pathname == "/search") {
      setNotFeedOrSearch(false);
    } else {
      setNotFeedOrSearch(true);
    }
  }, [location]);

  const brandNav = () => {
    navigate("feed");
  };

  const toggleChat = () => {
    setChatFrame((prev) => !prev);
  };
  const closeChat = () => {
    setChatFrame(false);
  };

  useEffect(() => {
    closeChat();
  }, [location]);

  return (
    <>
      <Navbar
        id="app-navbar"
        className={` fixed z-40 w-full pt-1 flex justify-between items-center flex-row shadow-2xl shadow-slate-800  text-black  md:gap-3 gap-0 ${colors.Nav} ${colors.NavText}`}
      >
        <div className="flex space-x-1 ">
          <Navbar.Brand
            onClick={brandNav}
            className="flex-shrink-0 hover:cursor-pointer"
          >
            <div className="pt-1 pl-1">
              <AppLogo Size={"35"} />
            </div>
          </Navbar.Brand>
          {isLoggedin && (
            <NavLink className="md:p-3 p-0 pt-2" to="feed">
              <Tooltip title="Feed">
                <CgFeed className="md:hidden" size={24} />
                <p className="hidden md:block">Feed</p>
              </Tooltip>
            </NavLink>
          )}
          {isLoggedin && (
            <>
              <Tooltip title="search">
                <button
                  className={` rounded-lg m-2 md:p-1 px-1  ${
                    !filter ? colors.Nav : colors.SearchButtonActive
                  } 
              `}
                  onClick={handelsearch}
                >
                  <FaSearch className="md:hidden" size={24} />
                  <p className="hidden md:block">Search</p>
                </button>
              </Tooltip>

              <NavLink
                className="md:p-3 p-0 pt-2"
                to={`/profile?userId=${userinfo.userInfo.UserId}`}
              >
                <Tooltip title="Profile">
                  <FaUser className="md:hidden" size={24} />
                  <p className="hidden md:block">Profile</p>
                </Tooltip>
              </NavLink>

              <NavLink className="md:p-3 p-0 pt-2" to="group">
                <Tooltip title="Group">
                  <FaPeopleGroup className="md:hidden" size={24} />
                  <p className="hidden md:block">Group</p>
                </Tooltip>
              </NavLink>

              {notFeedOrSearch && (
                <>
                  <Tooltip title="chat">
                    <button
                      className={` rounded-lg m-2 md:p-1 p-0  ${colors.Nav} 
              `}
                      onClick={toggleChat}
                    >
                      <p className="hidden md:block">Chat</p>
                      <GiChatBubble className="block md:hidden" size={24} />
                    </button>
                  </Tooltip>
                  {chatFrame && (
                    <div className={` block absolute right-5 top-14 z-30`}>
                      <InteractingUsersLists />
                    </div>
                  )}
                </>
              )}
            </>
          )}
          <NavLink className="md:p-3 p-0 pt-2" to="help">
            <Tooltip title="Help">
              <MdHelp className="md:hidden" size={24} />
              <p className="hidden md:block">Help</p>
            </Tooltip>
          </NavLink>
          <NavLink className="md:p-3 p-0 pt-2" to="about">
            <Tooltip title="About">
              <FaInfo className="md:hidden" size={24} />
              <p className="hidden md:block">About</p>
            </Tooltip>
          </NavLink>
        </div>
        <div className="flex space-x-1">
          {!isLoggedin && (
            <>
              <NavLink className="md:p-3 p-0 md:pt-2" to="register">
                Register
              </NavLink>
              <NavLink className="md:p-3 p-0 md:pt-2" to="login">
                <Tooltip title="Log In">
                  <LuLogIn size={24} />
                </Tooltip>
              </NavLink>
            </>
          )}
          {isLoggedin && (
            <>
              <div className=" mr-3 -mt-2 md:-mt-1">
                <NotificationAlert />
              </div>
              <button className="md:p-3 p-0 md:pt-2 " onClick={handelLogout}>
                <Tooltip title="Log out">
                  <LuLogOut size={24} />
                </Tooltip>
              </button>
            </>
          )}
          <button onClick={toggleTheme} className="rounded-lg md:p-2 pr-1">
            {Theme == "dark" ? (
              <BsFillLightbulbFill size={24} />
            ) : (
              <BsFillLightbulbOffFill size={24} />
            )}
          </button>
        </div>
      </Navbar>
      {filter && <FilterBar />}
    </>
  );
}

export default NavBar;
