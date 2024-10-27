import { Navigate } from "react-router-dom";
import { FCP } from "../../Types/@types";
import { useLogin } from "../../CustomHooks/useLogin";

const ProtectedRoute: FCP = ({ children }) => {
  const { isLoggedin } = useLogin();

  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
