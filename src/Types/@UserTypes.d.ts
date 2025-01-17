  
  export interface UserCardProps {
    UserDisplay: IAppUserDisplay;
  }
  
  export interface ProfileUserSectionProps {
    userId: string | null;
  }
  
  export  interface UserTabProps {
    UserDisplay: IAppUserDisplay;
  }


    
  export interface ProfileUserSectionProps {
    userId: string | null;
  }
  
  export  interface AdvancedSettingsComponentProps {
    userToEdit: IAppUserEdit;
    show: boolean;
  }
  
  export interface LoginInfo {
    email: string; password: string;
  }

  export interface IAuthinitalValues {
    isLoggedin: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    browser : string ;
  }
  
  export interface IUserValues {
    userInfo: {
      UserId: string | null;
      UserName: string | null;
      PermissionLevel: string | null;
      IsAdmin: string | null;
    };
  }
  

  
  export interface IDecodedToken {
    UserId: string;
    UserName: string;
    PermissionLevel: string;
    IsAdmin: string;
  }