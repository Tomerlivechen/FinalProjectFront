import { useEffect, useState } from "react";
import { IMessage } from "../../Models/ChatModels";
import { colors } from "../../Constants/Patterns";
import ElementFrame from "../../Constructors/ElementFrame";
import { useUser } from "../../CustomHooks/useUser";

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
  return (
    <>
      <ElementFrame
        tailwind={`h-auto text-wrap w-12/12 p-2 flex justify-between `}
      >
        <div
          className={`rounded-2xl p-2  bg-opacity-25 ${
            yours ? "bg-teal-500 mr-auto w-3/4" : "bg-purple-500 ml-auto w-3/4"
          }`}
        >
          <div
            className={`${colors.ActiveText} text-xs    ${
              yours ? "text-start" : "text-end"
            }`}
          >
            {MessageDisplay.userName}
          </div>
          <div className={`text-start ${yours ? "text-start" : "text-end"} `}>
            {MessageDisplay.message}
          </div>
          <div
            className={`${colors.ActiveText} text-xs ${
              yours ? "text-end" : "text-start"
            }`}
          >
            {MessageDisplay.Datetime}
          </div>
        </div>
      </ElementFrame>
    </>
  );
};
export { MessageComponent };
