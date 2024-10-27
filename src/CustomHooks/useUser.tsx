import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";

const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser must be within UserProvider");
  }
  return userContext;
};

export { useUser };
