import { useEffect, useState } from "react";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import EditUserComponent from "../Components/EditUserComponent";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { IAppUserDisplay } from "../Models/UserModels";

const UserSettings = () => {
  const userinfo = useUser();
  const [editedUser, setEditedUser] = useState<IAppUserDisplay>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      if (userinfo.userInfo.UserId) {
        await auth
          .getUser(userinfo.userInfo.UserId)
          .then((response) => setEditedUser(response.data));
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (editedUser) {
      setLoading(false);
    }
  }, [editedUser]);

  return (
    <>
      {loading ? (
        <ClimbBoxSpinner />
      ) : (
        <EditUserComponent userInfo={editedUser as IAppUserDisplay} />
      )}
    </>
  );
};

export default UserSettings;
