import { createContext, useState } from "react";

import { Chat } from "../Services/chat-service";

import { IChatService } from "../Types/@ChatTypes";
import { ProviderProps } from "../Types/@StructureTypes";

const ChatContext = createContext<IChatService | null>(null);
const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
  const [chatIds, setChatIds] = useState<string[]>([]);
  //open chat window
  const addChat = (chatId: string) => {
    if (chatIds.includes(chatId)) {
      return false;
    } //limit to 5 (starts overlapping even on a bigger screen)
    if (chatIds.length < 5) {
      setChatIds((prev) => [...prev, chatId]);
      return true;
    }
    return false;
  };

  const closeChat = (chatId: string) => {
    setChatIds((prev) => prev.filter((id) => id !== chatId));
  };

  const creatChat = async (id: string) => {
    const respons = await Chat.CreatChat(id);
    return respons.data;
  };

  return (
    <ChatContext.Provider
      value={{
        creatChat,
        addChat,
        chatIds,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
