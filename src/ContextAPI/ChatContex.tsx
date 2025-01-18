import { createContext, useEffect, useState } from "react";

import { Chat } from "../Services/chat-service";

import { IChatService } from "../Types/@ChatTypes";
import { ProviderProps } from "../Types/@StructureTypes";
import { dialogs } from "../Constants/AlertsConstant";

const ChatContext = createContext<IChatService | null>(null);
const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [maxChats, setMaxChats] = useState<number>(5);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMaxChats(1);
    } else if (window.innerWidth < 992) {
      setMaxChats(2);
    } else {
      setMaxChats(5);
    }
  }, []);

  //open chat window
  const addChat = (chatId: string) => {
    if (chatIds.includes(chatId)) {
      dialogs.error("Chat already open");
      return false;
    } //limit amount of chats open (to avoid overlapping on screen or off screen)
    if (chatIds.length < maxChats) {
      setChatIds((prev) => [...prev, chatId]);
      return true;
    }
    dialogs.error("Open chats max amount reached");
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
