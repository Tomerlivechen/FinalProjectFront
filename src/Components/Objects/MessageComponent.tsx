import { useEffect, useState } from "react";
import { IMessage } from "../../Models/ChatModels";
import { colors, convertUTCToLocalTime } from "../../Constants/Patterns";
import ElementFrame from "../../Constructors/ElementFrame";
import { useUser } from "../../CustomHooks/useUser";
import { BiSolidMessageAltX, BiSolidMessageEdit } from "react-icons/bi";
import { dialogs } from "../../Constants/AlertsConstant";
import { Chat } from "../../Services/chat-service";

const MessageComponent: React.FC<IMessage> = (MessageDisplay) => {
  const [yours, setYours] = useState(false);
  const userContext = useUser();

  useEffect(() => {
    if (userContext.userInfo.UserId == MessageDisplay.userId) {
      setYours(true);
    } else {
      setYours(false);
    }
  }, []);

  const editMessage = async (message: string) => {
    const newMessage = await dialogs.getText("Edit Message", message, message);
    Chat.updateMessage(newMessage, MessageDisplay.id);
  };
  const deleteMessage = () => {
    Chat.deleteMessage(MessageDisplay.id);
  };

  return (
    <>
      <ElementFrame
        tailwind={`h-auto text-wrap w-12/12 p-2 flex justify-between rounded-s-none `}
      >
        <div
          className={`rounded-2xl p-2  bg-opacity-25 ${
            yours ? "bg-teal-500 mr-auto w-3/4" : "bg-purple-500 ml-auto w-3/4"
          }`}
        >
          <div
            className={`flex justify-between items-center ${
              colors.ActiveText
            } text-xs ${yours ? "text-start" : "text-end flex-row-reverse"}`}
          >
            <span
              className="hover: cursor-pointer"
              onClick={() => {
                window.location.href = `/profile?userId=${MessageDisplay.userId}`;
              }}
            >
              {MessageDisplay.userName.slice(0, 15)}
              {MessageDisplay.userName.length > 15 && "..."}
            </span>
            {yours && MessageDisplay.editable && (
              <div className="flex gap-1">
                <button onClick={() => editMessage(MessageDisplay.message)}>
                  <BiSolidMessageEdit size={18} />
                </button>
                <button onClick={() => deleteMessage()}>
                  <BiSolidMessageAltX size={18} />
                </button>
              </div>
            )}
          </div>
          <div className={`text-start ${yours ? "text-start" : "text-end"} `}>
            {MessageDisplay.message}
          </div>
          <div
            className={`${colors.ActiveText} text-xs ${
              yours ? "text-end" : "text-start"
            }`}
          >
            {convertUTCToLocalTime(MessageDisplay.datetime, true)}
          </div>
        </div>
      </ElementFrame>
    </>
  );
};
export { MessageComponent };
