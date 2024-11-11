import { useEffect, useState } from "react";
import { sortByProperty } from "../../Constants/Patterns";
import { IAppUserDisplay } from "../../Models/UserModels";
import UserTab from "./UserTab";
import { useLocation, useSearchParams } from "react-router-dom";
import { isEqual } from "lodash";
import DinoSpinner from "../../Spinners/DinoSpinner";

interface UserTabListValues {
  sortElement?: keyof IAppUserDisplay;
  orderBy?: "asc" | "desc";
  users: IAppUserDisplay[];
  filter?: keyof IAppUserDisplay;
  Action?: (id: string) => void;
}

const UserTabList: React.FC<UserTabListValues> = (
  UserListValue: UserTabListValues
) => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<IAppUserDisplay[]>(UserListValue.users);
  const [order, setOrder] = useState(UserListValue.orderBy);
  const [sortBy, setSortBy] = useState(UserListValue.sortElement);
  const [filterBy, setFilterBy] = useState(UserListValue.filter);
  const [sortedUsers, setSortedUsers] = useState<IAppUserDisplay[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    getSearchParams();
  }, [searchParams]);

  const getSearchParams = () => {
    const _userId = searchParams.get("userId");
    if (_userId && !isEqual(userId, _userId)) {
      setUserId(_userId);
    } else {
      setUserId(null);
    }
  };

  const intervalTime = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      fillLists();
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fillLists();
  }, [UserListValue, userId, location, searchParams]);

  const fillLists = () => {
    setUsers(UserListValue.users);
    if (order && sortBy) {
      setSortedUsers(users.sort(sortByProperty(sortBy, order)));
    } else if (filterBy) {
      const filtered = users.filter((u) => u[filterBy] === true);
      setSortedUsers(filtered);
    } else {
      setSortedUsers(users);
    }
  };

  useEffect(() => {
    setOrder(UserListValue.orderBy);
    setSortBy(UserListValue.sortElement);
    setFilterBy(UserListValue.filter);
  }, [UserListValue, userId, searchParams]);

  useEffect(() => {
    if (sortedUsers) {
      setLoading(false);
    }
  }, [sortedUsers, userId, searchParams]);

  return (
    <>
      {!loading && sortedUsers ? (
        <div>
          {sortedUsers.map((user) => (
            <div className="p-2" key={user.id}>
              <UserTab UserDisplay={user} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <DinoSpinner size={20} />
        </div>
      )}
    </>
  );
};

export { UserTabList };
