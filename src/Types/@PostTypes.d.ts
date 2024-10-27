export  interface IPostSortingProps {
    icon: React.ComponentType<{ size: number }>;
    activeHook: boolean;
    type: "totalVotes" | "datetime" | "comments";
    tooltip: string;
  }
  
  export  interface IPostOrderProps {
    icon: React.ComponentType<{ size: number }>;
    activeHook: boolean;
    type: "ascending" | "descending";
    tooltip: string;
  }
  
  export  interface PostListValues {
    sortElement?: keyof IPostDisplay;
    orderBy?: "asc"|"desc";
    posts: IPostDisplay[];
    filter?: number|null;
  }



  
  export interface IPostFrameParams {
    UserList: string[];
  }
  