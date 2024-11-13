  
  export interface ResizableFrameProps {
    children: ReactNode;
    whidth?: string;
    tailwindProps?: string;
    overflowX?: boolean;
    title: string;
    show: boolean;
    setShow? : React.Dispatch<React.SetStateAction<boolean>>
    noMid? : boolean
  }
  
  export interface ResizableFrameButtonProps {
    icon: React.ComponentType<{ size: number }>;
    activeHook: boolean;
    size: "min" | "mid" | "max" | "closed";
  }
  export type overflowtype = "visible" | "hidden" | "scroll" | "auto" | "clip";

  export type Position =
  | "absolute"
  | "relative"
  | "fixed"
  | "sticky"
  | "initial"
  | "inherit";


  export interface IContrastProps {
    color: boolean;
    blackAndWhite: boolean;
    colorContrast: boolean;
  }
  
  export interface IZoomProps {
    zoom: number;
  }
  
  
  export interface basicElements {
    children: ReactNode;
    height?: string;
    width?: string;
    padding?: string;
    tailwind?: string;
    position?: Position;
    top?: string;
    left?: string;
    right?: string;
    overflowY?: overflowtype;
    overflowX?: overflowtype;
    zindex?: number;
    margin?: string;
    direction?: "ltr" | "rtl";
    notRounded?: boolean;
  }
  
  export interface MYFormikValues {
    Title?: string;
    element: string;
    type: string;
    placeholder: string;
    required: boolean;
    hidden: boolean;
    value?: string;
    style?: CSSProperties;
    as?: string;
    textbox?: boolean;
    width?: string;
    classes?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    initalValues?: string;
    tailwind?: string;
  }

  export interface ProviderProps {
    children: ReactNode;
  }


  


  
  export interface ISearchToggleFunctions {
    toggleUserSearch: (key: keyof IUserSelector | null) => void;
    togglePostSearch: (key: keyof IPostSelector | null) => void;
  }
  
  export const defaultSearchToggle: ISearchToggleFunctions = {
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