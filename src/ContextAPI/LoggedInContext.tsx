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
};

const LoggedInContext = createContext(initialValues);
const LoggedInProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(initialValues.isLoggedin);
  const [token, setToken] = useState(initialValues.token);

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
    <LoggedInContext.Provider value={{ isLoggedin, token, login, logout }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
