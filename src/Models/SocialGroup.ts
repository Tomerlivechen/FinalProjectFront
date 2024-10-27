import { IPost } from "./Interaction";
import { IAppUserDisplay } from "./UserModels";

interface ISocialGroup {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  banerImageURL : string;
  groupCreatorId: string;
  groupRules :string;
  groupCreator: IAppUserDisplay;
  adminId: string;
  groupAdmin: IAppUserDisplay;
  members: IAppUserDisplay[];
  posts: IPost[];
  isMemember: boolean;
}

interface ISocialGroupDisplay {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  banerImageURL : string;
  groupCreatorId: string;
  groupRules :string;
  adminId: string;
  adminName: string;
  isMemember: boolean;
}


interface ISocialGroupCard {
  id: string;
  name: string;
  description: string;
  banerImageURL : string;
  groupRules :string;
  admin: IAppUserDisplay;
  isMemember: boolean;
}

interface ISocialGroupEdit {
  id?: string;
  name?: string;
  description?: string;
  banerImageURL ?: string;
  groupRules? :string;
  imageURL?: string;
  newAdminEmail ?:string;
}


interface INewSocialGroup {
  name: string;
  description: string;
}
export type { ISocialGroup,ISocialGroupCard,INewSocialGroup,ISocialGroupDisplay,ISocialGroupEdit };
