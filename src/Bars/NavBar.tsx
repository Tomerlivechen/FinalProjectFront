import { useContext, useEffect, useState } from "react";
import { Navbar, Tooltip } from "react-bootstrap";
import "../Css/Navbar.scss";
import { ThemeContext } from "../ContextAPI/ThemeContext";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { colors } from "../Constants/Patterns";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";
import FilterBar from "./FilterBar";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { NotificationAlert } from "../Components/Objects/NotificationAlert";
import { FaPeopleGroup } from "react-icons/fa6";
import { AppLogo } from "../Components/Objects/AppLogo";
function NavBar() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const location = useLocation();
  const { Theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedin, logout } = useContext(LoggedInContext);
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
    if (location.pathname != "/search") {
      setFilter(false);
    }
  }, [location]);

  return (
    <>
      <Navbar
        id="app-navbar"
        className={` fixed z-40 w-full flex-row shadow-2xl shadow-slate-800  text-black flex md:gap-3 gap-0 ${colors.Nav} ${colors.NavText}`}
      >
        <Navbar.Brand href="/feed" className="flex-shrink-0">
          <div className="pt-1 pl-1">
            <AppLogo Size={"35"} />
          </div>
        </Navbar.Brand>
        {isLoggedin && (
          <NavLink className="md:p-3 p-1 pt-2" to="feed">
            <Tooltip title="Feed">
              <CgFeed className="md:hidden" size={24} />
              <p className="hidden md:block">Feed</p>
            </Tooltip>
          </NavLink>
        )}
        <NavLink className="md:p-3 p-1 pt-2" to="about">
          <Tooltip title="About">
            <FaInfo className="md:hidden" size={24} />
            <p className="hidden md:block">About</p>
          </Tooltip>
        </NavLink>
        {isLoggedin && (
          <>
            <NavLink className="md:p-3 p-1 pt-2" to="profile">
              <Tooltip title="Profile">
                <FaUser className="md:hidden" size={24} />
                <p className="hidden md:block">Profile</p>
              </Tooltip>
            </NavLink>
            <NavLink className="md:p-3 p-1 pt-2" to="group">
              <Tooltip title="Group">
                <FaPeopleGroup className="md:hidden" size={24} />
                <p className="hidden md:block">Group</p>
              </Tooltip>
            </NavLink>

            <Tooltip title="search">
              <button
                className={` rounded-lg m-2 p-1  ${
                  !filter ? colors.Nav : colors.SearchButtonActive
                } 
              `}
                onClick={handelsearch}
              >
                <FaSearch className="md:hidden" size={24} />
                <p className="hidden md:block">Search</p>
              </button>
            </Tooltip>
          </>
        )}
        <div className=" flex-1"></div>

        {!isLoggedin && (
          <>
            <NavLink className="md:p-3 p-1 pt-2" to="register">
              Register
            </NavLink>
            <NavLink className="md:p-3 p-1 pt-2" to="login">
            <Tooltip title="Log In">
                <LuLogIn size={24} />
              </Tooltip>
            </NavLink>

          </>
        )}
        {isLoggedin && (
          <>
            <div className="mr-6">
              <NotificationAlert />
            </div>
            <button className="md:p-3 p-1 pt-2" onClick={handelLogout}>
              <Tooltip title="Log out">
                <LuLogOut size={24} />
              </Tooltip>
            </button>
          </>
        )}
        <button onClick={toggleTheme} className="rounded-lg p-2">
          {Theme == "dark" ? (
            <BsFillLightbulbFill size={24} />
          ) : (
            <BsFillLightbulbOffFill size={24} />
          )}
        </button>
      </Navbar>
      {filter && <FilterBar />}
    </>
  );
}

export default NavBar;
