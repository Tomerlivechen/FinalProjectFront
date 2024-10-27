
export interface ChatFrameProps {
    chatID: string;
  }
  
  export  interface ISendMessageComponent {
    chatId: string;
  }

 export interface ChatValues {
    chatInfo: IChat | null;
    isOpen?: boolean;
  }
  
  export interface IChatContext {
    chatBoxValues: ChatValues | null;
    closeChat: () => void;
    contact: (id: string) => void;
    loading: boolean;
    toggleWindowSize: () => void;
    creatChat: (id: string) => Promise<string>;
    chatId: string;
  }
  
  export interface IChatService {
    addChat: (chatId: string) => boolean;
    chatIds: string[];
    closeChat: (chatId: string) => void;
    creatChat: (id: string) => Promise<string>;
  }