import {
  ICategory,
  ICommentDisplay,
  IPostDisplay,
} from "../Models/Interaction";
import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "./AlertsConstant";
import { auth } from "../Services/auth-service";
import { Posts } from "../Services/post-service";
import { jwtDecode } from "jwt-decode";

import { AxiosError } from "axios";
import { IDecodedToken, IUserValues } from "../Types/@UserTypes";

const colors = {
  NavBarColor: "bg-blue-300 dark:bg-gray-800",
  NavBarText: "dark:text-gray-100 text-gray-900",
  Nav: "bg-blue-300 dark:bg-gray-800", // Blue for professionalism and trust, with a neutral dark gray for dark mode
  Filter: "bg-blue-300  dark:bg-gray-700", // Orange adds energy and warmth to the more serious blue, creating contrast
  NavText: "dark:text-gray-100 text-gray-900", // Gray tones for text to remain neutral and readable
  SearchButtonActive:
    "bg-blue-500 text-white font-bold dark:bg-orange-500 dark:text-gray-100", // Blue for active states, switching to vibrant orange in dark mode
  ActiveText: "text-blue-700 font-bold dark:text-orange-300", // Subtle blue tone for light mode, with orange for contrast in dark mode
  CommentColors:
    "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200", // Neutral for content-focused sections like comments
  PostColors: "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300", // Simple, clean background for posts to highlight content
  ElementFrame:
    "bg-blue-100 text-blue-900 dark:bg-gray-900 dark:text-orange-400 shadow-lg dark:scrollbar-webkit-dark scrollbar-webkit-light dark:shadow-black dark:scrollbar-dark scrollbar-light ", // Solid, professional look with subtle pops of color
  TextBox: "bg-gray-50 text-gray-800 dark:bg-blue-950 dark:text-gray-300", // Calming blue tones for input fields, enhancing focus
  Buttons: "bg-blue-500 text-white dark:bg-orange-600 dark:text-gray-100", // Action buttons use blue in light mode and warm orange in dark mode
  ButtonFont: "text-blue-800 dark:text-orange-400",
  ButtonFontDisabled: "text-blue-950 dark:text-orange-100", // High contrast for readability across different button states
  InteractionText: "text-blue-800 dark:text-orange-400",
  FormikDiv:
    "font-extralight form-group flex flex-col gap-2 mx-auto text-lg mt-5",
  FormikDivTight:
    "font-extralight form-group flex flex-col gap-2 mx-auto text-lg",
  ForkikField: "rounded-md hover:border-2 border-2 px-2 py-2",
};

export const categories: ICategory[] = [
  { id: 12, name: "AI" },
  { id: 10, name: "Advocacy" },
  { id: 2, name: "Educational" },
  { id: 5, name: "Entertainment" },
  { id: 11, name: "Health" },
  { id: 8, name: "Interactive" },
  { id: 4, name: "Inspirational" },
  { id: 7, name: "News" },
  { id: 3, name: "Personal" },
  { id: 6, name: "Promotional" },
  { id: 1, name: "Uncategorized" },
  { id: 9, name: "Visuals" },
];

export function convertUTCToLocalTime(utcTime: string, full: boolean) {
  const utcDate = new Date(utcTime + "Z");

  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, "0");
  const day = String(utcDate.getDate()).padStart(2, "0");
  const hours = String(utcDate.getHours()).padStart(2, "0");
  const minutes = String(utcDate.getMinutes()).padStart(2, "0");
  const seconds = String(utcDate.getSeconds()).padStart(2, "0");
  if (full) {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const sortByProperty = <T,>(
  property: keyof T,
  order: "asc" | "desc" = "asc"
) => {
  return (a: T, b: T) => {
    const valueA = a[property];
    const valueB = b[property];

    if (property === "datetime") {
      const dateA = new Date(valueA as string).getTime();
      const dateB = new Date(valueB as string).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (property === "comments") {
      const commentsA = (valueA as ICommentDisplay[] | null)?.length || 0;
      const commentsB = (valueB as ICommentDisplay[] | null)?.length || 0;
      return order === "asc" ? commentsA - commentsB : commentsB - commentsA;
    }

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return order === "asc" ? -1 : 1;
    if (valueB == null) return order === "asc" ? 1 : -1;

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  };
};

export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};

export const getFlowingPosts = async () => {
  const JWTtoken = localStorage.getItem("token");
  let newAuthState: IUserValues = {
    userInfo: {
      UserId: null,
      UserName: null,
      PermissionLevel: null,
      IsAdmin: null,
    },
  };
  if (JWTtoken) {
    const decodedToken = jwtDecode<IDecodedToken>(JWTtoken);
    newAuthState = {
      userInfo: {
        UserId: decodedToken.UserId || null,
        UserName: decodedToken.UserName || null,
        PermissionLevel: decodedToken.PermissionLevel || null,
        IsAdmin: decodedToken.IsAdmin || null,
      },
    };
  }
  const followingUserIdsRespons = await auth.GetFollowingIds();
  const followingUserIds = followingUserIdsRespons.data;
  const followingPosts: IPostDisplay[] = [];
  for (const userId of followingUserIds) {
    try {
      const response = await Posts.GetAuthorPosts(userId);
      followingPosts.push(...response.data);
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
    }
  }
  if (newAuthState.userInfo.UserId) {
    const userPosts = await Posts.GetAuthorPosts(newAuthState.userInfo.UserId);
    followingPosts.push(...userPosts.data);
  }
  return followingPosts;
};

const stringToAppUserDisplay = (
  userDisplay: IAppUserDisplay | IAppUserDisplay[] | undefined
): IAppUserDisplay | IAppUserDisplay[] => {
  if (!userDisplay) {
    throw new Error("UserDisplay cannot be null or undefined");
  }
  if (Array.isArray(userDisplay)) {
    return userDisplay;
  } else {
    return userDisplay;
  }
};

const stringToPostDisplay = (
  postDisplay: IPostDisplay | IPostDisplay[] | undefined
): IPostDisplay | IPostDisplay[] => {
  if (!postDisplay) {
    throw new Error("PostDisplay cannot be null or undefined");
  }
  if (Array.isArray(postDisplay)) {
    return postDisplay;
  } else {
    return postDisplay;
  }
};
interface ErrorResponse {
  [key: string]: string[] | undefined;
}
const catchError = (error: AxiosError, action: string) => {
  if (error && error.response && error.response.data) {
    const data = error.response.data as ErrorResponse;
    const errorMessages = data[`${action} Failed`];
    if (Array.isArray(errorMessages)) {
      const message = errorMessages.join(" & ");
      dialogs.error(message);
    } else {
      dialogs.error("An unknown error occurred.");
    }
  } else {
    dialogs.error("An error occurred. Please try again.");
  }
};
export { colors, stringToAppUserDisplay, catchError, stringToPostDisplay };
