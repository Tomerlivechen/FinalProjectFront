import { createContext, useEffect, useState } from "react";
import { IAppUserDisplay } from "../Models/UserModels";
import { IPostDisplay } from "../Models/Interaction";
import { auth } from "../Services/auth-service";

import {
  sortByProperty,
  stringToAppUserDisplay,
  stringToPostDisplay,
} from "../Constants/Patterns";
import { Posts } from "../Services/post-service";
import { ProviderProps } from "../Types/@StructureTypes";

export interface IUserSelector {
  UserName: boolean;
  FirstName: boolean;
  LastName: boolean;
}

export interface IPostSelector {
  UserName: boolean;
  Title: boolean;
  KeyWords: boolean;
  Voted: boolean;
}

const ValuesPost: IPostSelector = {
  UserName: false,
  Title: false,
  KeyWords: false,
  Voted: false,
};

const ValuesUser: IUserSelector = {
  UserName: false,
  FirstName: false,
  LastName: false,
};

export interface ISearchToggleFunctions {
  toggleUserSearch: (key: keyof IUserSelector | null) => void;
  togglePostSearch: (key: keyof IPostSelector | null) => void;
}

const defaultSearchToggle: ISearchToggleFunctions = {
  toggleUserSearch: (key) => {
    console.warn(`toggleUserSearch called with key: ${key}`);
  },
  togglePostSearch: (key) => {
    console.warn(`togglePostSearch called with key: ${key}`);
  },
};

export interface ISearchContext {
  postSearch: IPostSelector;
  userSearch: IUserSelector;
  searchToggleFunctions: ISearchToggleFunctions;
  searchValue: string;
  setSearchValue: (searchTerm: string) => void;
  userList: IAppUserDisplay[];
  postList: IPostDisplay[];
  filterUserList: IAppUserDisplay[];
  filterPostList: IPostDisplay[];
  fillLists: () => void;
  filterUsers: () => void;
  filterPosts: () => void;
  loadingData: boolean;
}
const searchTermBase = "";
const SearchContext = createContext<ISearchContext>({
  postSearch: ValuesPost,
  userSearch: ValuesUser,
  searchToggleFunctions: defaultSearchToggle,
  searchValue: searchTermBase,
  setSearchValue: () => {},
  userList: [],
  postList: [],
  filterUserList: [],
  filterPostList: [],
  fillLists: () => {},
  filterUsers: () => {},
  filterPosts: () => {},
  loadingData: false,
});

const SearchProvider: React.FC<ProviderProps> = ({ children }) => {
  const [postSearch, setPostSearch] = useState(ValuesPost);
  const [userSearch, setUserSearch] = useState(ValuesUser);
  const [searchValue, setSearchValue] = useState(searchTermBase);
  const [userList, setUserList] = useState<IAppUserDisplay[]>([]);
  const [postList, setPostList] = useState<IPostDisplay[]>([]);
  const [loadingData, setloadingData] = useState(true);
  const [filterUserList, setFilterUserList] = useState<IAppUserDisplay[]>([]);
  const [filterPostList, setFilterPostList] = useState<IPostDisplay[]>([]);
  const [votedOnePosts, setVotedOnePosts] = useState<IPostDisplay[]>([]);

  useEffect(() => {
    setFilterUserList([]);
    setFilterPostList([]);
    setVotedOnePosts([]);
  }, [userSearch, postSearch]);

  useEffect(() => {
    fillLists();
  }, [postSearch, userSearch]);

  const fillLists = async () => {
    await auth
      .getUsers()
      .then((response) => {
        const parsedUsers = stringToAppUserDisplay(response.data);
        setUserList(Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]);
      })
      .catch((error) => {
        console.error(error, "Getting users");
      });

    await Posts.getPosts()
      .then((response) => {
        const parsedPosts = stringToPostDisplay(response.data);
        setPostList(Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]);
      })
      .catch((error) => {
        console.error(error, "Getting Posts");
      });

    await getVotedon();
  };

  const filterUsers = () => {
    setloadingData(true);
    let filtering = userList;
    if (userList != null) {
      if (userSearch.FirstName) {
        filtering = userList.filter((user) =>
          user.first_Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (userSearch.LastName) {
        filtering = userList.filter((user) =>
          user.last_Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (userSearch.UserName) {
        filtering = userList.filter((user) =>
          user.userName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      setFilterUserList(filtering);
      setloadingData(false);
    }
  };

  const getVotedon = async () => {
    const respons = await Posts.GetVotedOn();
    setVotedOnePosts(respons.data as IPostDisplay[]);
  };

  const filterPosts = async () => {
    setloadingData(true);
    let filtering = postList;
    if (postList != null) {
      if (postSearch.UserName) {
        filtering = postList.filter((post) =>
          post.authorName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (postSearch.Title) {
        filtering = postList.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (postSearch.KeyWords) {
        const firstFilter = postList.filter((post) => post.keyWords != null);
        filtering = firstFilter.filter((post) =>
          post.keyWords!.some((keyword) =>
            keyword.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }
      if (postSearch.Voted) {
        let firstFilter;
        if (searchValue.length > 1) {
          firstFilter = votedOnePosts.filter((post) =>
            post.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        } else {
          firstFilter = votedOnePosts
            .slice()
            .sort(sortByProperty<IPostDisplay>("datetime", "desc"));
        }
        filtering = firstFilter;
      }
      setFilterPostList(filtering);
      setloadingData(false);
    }
  };

  const toggleUserSearch = (key: keyof IUserSelector | null) => {
    if (key == null) {
      setUserSearch({
        UserName: false,
        FirstName: false,
        LastName: false,
      });
    } else {
      setUserSearch({
        UserName: false,
        FirstName: false,
        LastName: false,
        [key]: true,
      });
    }
  };

  const togglePostSearch = (key: keyof IPostSelector | null) => {
    if (key == null) {
      setPostSearch({
        UserName: false,
        Title: false,
        KeyWords: false,
        Voted: false,
      });
    } else {
      setPostSearch({
        UserName: false,
        Title: false,
        KeyWords: false,
        Voted: false,
        [key]: true,
      });
    }
  };

  const searchToggleFunctions = {
    toggleUserSearch,
    togglePostSearch,
  };

  return (
    <SearchContext.Provider
      value={{
        postSearch,
        userSearch,
        searchToggleFunctions,
        searchValue,
        setSearchValue,
        fillLists,
        filterUsers,
        filterPosts,
        filterUserList,
        filterPostList,
        loadingData,
        userList,
        postList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
