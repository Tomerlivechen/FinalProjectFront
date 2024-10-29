
export interface IAppImage {
    id: IAppUserDisplay;
    userId: string;
    url : string;
    datetime : string;
    title : string;
    Public : boolean;
  }

export interface IImageListPops {
  open: boolean;
  setOpen: booleanReact.Dispatch<React.SetStateAction<boolean>>;
} 