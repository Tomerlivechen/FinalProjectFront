import { useState } from "react";
import ElementFrame from "../../Constructors/ElementFrame";
import { colors } from "../../Constants/Patterns";
import { BsFillSendFill } from "react-icons/bs";
import { Tooltip } from "react-bootstrap";
import { TbSend } from "react-icons/tb";
import { Chat, INewMessage } from "../../Services/chat-service";
import { ISendMessageComponent } from "../../Types/@ChatTypes";

const SendMessageComponent: React.FC<ISendMessageComponent> = (chatInfo) => {
  const [text, setText] = useState<string>("");

  const fieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const newMessage: INewMessage = {
      ChatId: chatInfo.chatId,
      message: text,
    };
    Chat.sendMessage(newMessage);
    setText("");
  };
  return (
    <>
      <ElementFrame
        tailwind={`h-auto text-lg w-12/12 p-2 flex justify-center `}
      >
        <textarea
          className={`h-auto text-lg w-8/12 ${colors.TextBox} rounded-2xl p-1`}
          placeholder={"Message"}
          value={text}
          onChange={fieldChange}
          onKeyDown={handleKeyDown}
          style={{
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            resize: "none",
          }}
        />

        <button
          className={`${colors.InteractionText} p-3`}
          disabled={text.length < 1}
          onClick={sendMessage}
        >
          <Tooltip title="Send Message">
            {text.length > 0 ? (
              <BsFillSendFill size={30} />
            ) : (
              <TbSend size={30} />
            )}
          </Tooltip>
        </button>
      </ElementFrame>
    </>
  );
};
export { SendMessageComponent };
