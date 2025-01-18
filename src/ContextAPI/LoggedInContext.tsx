import { createContext, useEffect, useState } from "react";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { IAuthinitalValues } from "../Types/@UserTypes";
import { ProviderProps } from "../Types/@StructureTypes";

const initialValues: IAuthinitalValues = {
  isLoggedin: !!localStorage.getItem("token"),
  token: localStorage.getItem("token")?.toString() ?? null,
  login: () => {},
  logout: () => {},
  browser: "",
};

const LoggedInContext = createContext(initialValues);
const LoggedInProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(initialValues.isLoggedin);
  const [token, setToken] = useState(initialValues.token);
  const [browser, setBrowser] = useState("");
  //detects what brouser the user is using, some have probelms with refersh and local storage
  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
      setBrowser("Chrome");
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      setBrowser("Safari");
    } else if (userAgent.includes("Firefox")) {
      setBrowser("Firefox");
    } else if (userAgent.includes("Edg")) {
      setBrowser("Edge");
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      setBrowser("Opera");
    } else {
      setBrowser("Unknown Browser");
    }
  }, []);

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setToken(null);
  }

  function login(token: string) {
    setIsLoggedIn(true);
    setToken(token);
  }

  useEffect(() => {
    if (initialValues.token) {
      auth
        .validate()
        .then((response) => {
          if (response.status === 200) {
            login(initialValues.token ?? "");
          } else {
            logout();
            dialogs.error("Token is invalid.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            dialogs.error("Unauthorized: Invalid token.");
            logout();
          } else {
            dialogs.error(error.message);
            logout();
          }
        });
    }
  }, []);

  return (
    <LoggedInContext.Provider
      value={{ isLoggedin, token, login, logout, browser }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
