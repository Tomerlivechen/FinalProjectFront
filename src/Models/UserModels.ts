import { IChat } from "./ChatModels";
import { IPost } from "./Interaction";
import { ISocialGroup } from "./SocialGroup";

interface IAppUserDisplay {
  id: string;
  prefix: string;
  first_Name: string;
  last_Name: string;
  userName: string;
  email: string;
  imageURL: string;
  following: boolean;
  blocked: boolean;
  blockedYou: boolean;
  pronouns: string;
  bio : string;
  banerImageURL:string;
  hideEmail:boolean;
  hideName: boolean;
  hideBlocked : boolean
  lastActive: string;
  chatId : string;
  votedOn: string[];
  online : boolean;
  isActive : boolean;
}

interface IEditUser {
  oldPassword?: string;
  newPassword?: string;
  permissionLevel?: string;
}


export interface IAppUserEdit {
  id: string;
  userName: string;
  oldPassword: string;
  newPassword: string;
  bio: string;
  prefix: string;
  hideEmail: boolean;
  hideName: boolean;
  hideBlocked: boolean;
  banerImageURL: string;
  first_Name: string;
  last_Name: string;
  pronouns: string;
  imageURL: string;
  permissionLevel: string;
}
const AppUserDisplay = {
  id: "",
  prefix: "",
  first_Name: "",
  last_Name: "",
  userName: "",
  email: "",
  imageURL: "",
  following: false,
  blocked: false,
  blockedYou: false,
  pronouns: "",
};

interface IAppUserFull {
  prefix: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  imageUrl: string;
  imageAlt: string;
  Bio : string;
  BanerImageURL:string;
  HideEmail:boolean;
  HideName: boolean;
  HideBlocked : boolean
  permissionLevel: string;
  following: IAppUserDisplay[];
  blocked: IAppUserDisplay[];
  posts: IPost[];
  socialGroups: ISocialGroup[];
  voteScore: number;
  chats: IChat[];
  notifications: Notification[];
}


export type { IAppUserDisplay, IAppUserFull , IEditUser };
export { AppUserDisplay };
