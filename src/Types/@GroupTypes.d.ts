export  interface IGroupCardListProps {
    GroupFilter: string | null;
    usersGroups: boolean;
  }
  

  
  export interface IMemberEditTabProps {
    userInfo: IAppUserDisplay;
    socialGroupId: string;
  }
  
  export interface IConfirmJoinGoupProps {
    title: string;
    text: string;
    buttonText: string;
    groupId: string;
  }