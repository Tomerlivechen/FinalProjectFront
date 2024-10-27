import { useContext } from "react";
import { ChatContext } from "../ContextAPI/ChatContex";

const useChat = () => {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("useChat must be within ChatProvider");
  }
  return chatContext;
};

export { useChat };
