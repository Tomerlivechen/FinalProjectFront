import { useContext } from "react";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";

const useLogin = () => {
  const loggedInContext = useContext(LoggedInContext);
  if (!loggedInContext) {
    throw new Error("useLogin must be within loggedInProvider");
  }
  return loggedInContext;
};

export { useLogin };
