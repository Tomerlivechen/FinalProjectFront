import { useEffect, useState } from "react";
import { useChat } from "../CustomHooks/useChat";
import { ChatFrame } from "../Components/ChatFrame";

const FooterBar = () => {
  const chatContex = useChat();
  const [chats, setChats] = useState<string[]>([]);

  useEffect(() => {
    if (chatContex.chatIds) {
      setChats(chatContex.chatIds);
    }
  }, [chatContex.chatIds]);

  return (
    <>
      <div className="fixed bottom-0 right-0 flex gap-4">
        {chats.map((chat, index) => (
          <div
            key={chat}
            className={`absolute bottom-0 w-80`}
            style={{ right: index * 350 }}
          >
            <ChatFrame chatID={chat} />
          </div>
        ))}
      </div>
    </>
  );
};

export { FooterBar };
