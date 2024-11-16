import { useEffect, useRef, useState } from "react";
import { colors, sortByProperty } from "../Constants/Patterns";

import { IChat, IMessage } from "../Models/ChatModels";
import { SendMessageComponent } from "./Objects/SendMessageComponent";
import { MdOpenInNew } from "react-icons/md";

import { GrClose } from "react-icons/gr";
import { HiMiniMinus } from "react-icons/hi2";
import { useChat } from "../CustomHooks/useChat";
import { Chat } from "../Services/chat-service";
import { AiOutlineLoading } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
import { ChatFrameProps, ISendMessageComponent } from "../Types/@ChatTypes";
import { MessageComponent } from "./Objects/MessageComponent";
import { isEqual } from "lodash";

const ChatFrame: React.FC<ChatFrameProps> = ({ chatID }) => {
  const chatContext = useChat();
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({
    min: false,
    mid: true,
    closed: false,
  });
  const [frameHeight, setFrameHeight] = useState<"hidden" | "h-96">("h-96");

  const [sendMessage, setSendMessage] = useState<ISendMessageComponent>({
    chatId: chatID,
  });
  const [chatInfo, setChatInfo] = useState<IChat | null>(null);
  const [chatRespons, setChatRespons] = useState(null);
  const [userNames, setUserNames] = useState<string>("");

  const getChatValues = async (chatId: string) => {
    const chatValues = await Chat.getChat(chatId);
    setChatRespons(chatValues.data);
  };

  const intervalTime = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (chatID) {
        getChatValues(chatID);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatID)
      setSendMessage({
        chatId: chatID,
      });
  }, []);

  useEffect(() => {
    if (chatID) {
      getChatValues(chatID);
    }
  }, [chatID]);

  useEffect(() => {
    if (!isEqual(chatRespons, chatInfo)) {
      setLoading(true);
      setChatInfo(chatRespons);
    }
  }, [chatRespons]);

  useEffect(() => {
    if (chatInfo) {
      setLoading(false);
      if (userNames.length < 1) {
        setUserNames(`${chatInfo.user1Name} , ${chatInfo.user2Name}`);
      }
    }
  }, [chatInfo]);

  useEffect(() => {
    if (size.min) {
      setFrameHeight("hidden");
    }
    if (size.mid) {
      setFrameHeight("h-96");
    }
    if (size.closed) {
      setFrameHeight("hidden");
      chatContext.closeChat(chatID);
    }
  }, [size]);

  const toggleBoolean = (size: "min" | "mid" | "closed") => {
    setSize({
      min: false,
      mid: false,
      closed: false,
      [size]: true,
    });
  };

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [chatInfo]);

  return (
    <>
      {!size.closed ? (
        <>
          <div
            className={`${colors.ElementFrame} h-14 p-4 pb-4 gap-4 rounded-t-xl flex justify-between items-center `}
          >
            <div className="flex justify-center items-center pl-8 ">
              {!loading ? (
                ` ${userNames}`
              ) : (
                <AiOutlineLoading className=" animate-spin" size={25} />
              )}
            </div>
            <div className="ml-auto flex gap-4">
              <button onClick={() => toggleBoolean("min")} disabled={size.min}>
                <HiMiniMinus
                  size={24}
                  className={` ${size.min && colors.ActiveText}`}
                />
              </button>
              <button onClick={() => toggleBoolean("mid")} disabled={size.mid}>
                <MdOpenInNew
                  size={24}
                  className={` ${size.mid && colors.ActiveText}`}
                />
              </button>
              <button onClick={() => toggleBoolean("closed")}>
                <GrClose size={24} />
              </button>
            </div>
          </div>
          <div
            ref={scrollableDivRef}
            className={`${colors.ElementFrame} ${frameHeight}   pb-4 gap-4 rounded-b-xl overflow-y-auto dark:scrollbar-dark scrollbar-light scrollbar px-1`}
          >
            {chatInfo?.messages ? (
              chatInfo.messages
                .slice()
                .sort(sortByProperty<IMessage>("datetime", "asc"))
                .map((message) => (
                  <MessageComponent key={message.id} {...message} />
                ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <VscLoading className="animate-spin" size={35} />
              </div>
            )}
          </div>
          {size.mid && <SendMessageComponent {...sendMessage} />}
        </>
      ) : null}
    </>
  );
};

export { ChatFrame };
