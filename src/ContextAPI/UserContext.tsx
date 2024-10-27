import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { IDecodedToken, IUserValues } from "../Types/@UserTypes";
import { ProviderProps } from "../Types/@StructureTypes";
import { initialValues } from "../Models/AuthModels";

const UserContext = createContext(initialValues);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IUserValues>(initialValues);
  useEffect(() => {
    const JWTtoken = localStorage.getItem("token");
    if (JWTtoken) {
      const decodedToken = jwtDecode<IDecodedToken>(JWTtoken);
      const newAuthState: IUserValues = {
        userInfo: {
          UserId: decodedToken.UserId || null,
          UserName: decodedToken.UserName || null,
          PermissionLevel: decodedToken.PermissionLevel || null,
          IsAdmin: decodedToken.IsAdmin || null,
        },
      };
      setAuthState(newAuthState);
    }
  }, []);

  return (
    <UserContext.Provider value={authState}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
