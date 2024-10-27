import { useEffect, useState } from "react";
import { auth } from "../../Services/auth-service";
import UserTab from "./UserTab";
import { IAppUserDisplay } from "../../Models/UserModels";

const FollowingList = () => {
  const [users, setUsers] = useState<IAppUserDisplay[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      auth.getUsers().then((response) => {
        console.log("respons", response);
        const parsedUsers = response.data;
        setUsers(Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]);
      });
    };

    getUsers();
  }, []);

  return (
    <>
      {users && (
        <div>
          {users.map((user) => (
            <>
              {user.following && (
                <div className="p-2">
                  <UserTab key={user.id} UserDisplay={user} />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export { FollowingList };
