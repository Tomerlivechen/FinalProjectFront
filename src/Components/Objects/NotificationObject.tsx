import { useEffect, useState } from "react";

import { colors } from "../../Constants/Patterns";
import { auth } from "../../Services/auth-service";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../CustomHooks/useChat";
import { Notification } from "../../Services/notification-service";
import { IoClose } from "react-icons/io5";
import { Tooltip } from "react-bootstrap";
import { INotificationDisplay } from "../../Types/@NotificationTyoe";

const NotificationObject: React.FC<{
  NotificationData: INotificationDisplay;
}> = ({ NotificationData }) => {
  const [notification, setNotification] = useState<INotificationDisplay | null>(
    null
  );
  const chatContext = useChat();
  const navigate = useNavigate();
  const [nameOfNotifier, setNameOfNotifier] = useState("");
  const [notificationTypeText, setNotificationTypeText] = useState("");
  const [actionPathName, setActionPathName] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      if (notification) {
        const Notifier = await auth.getUser(notification.notifierId);
        setNameOfNotifier(Notifier.data.userName);
        if (notification.type == "Comment") {
          setNotificationTypeText("Has commented on your post ");
          setActionPathName("Post");
        }
        if (notification.type == "Message") {
          setNotificationTypeText("Has sent you a message ");
          setActionPathName("Chat");
        }
      }
    };

    getUsername();
  }, [notification]);

  const GoToUser = () => {
    console.log(`${notification?.notifierId}`);
    navigate(`/Profile/${notification?.notifierId}`);
  };

  useEffect(() => {
    if (NotificationData) {
      setNotification(NotificationData);
    }
  }, [NotificationData]);

  const activateNotification = () => {
    if (actionPathName == "Chat" && notification?.referenceId) {
      chatContext.addChat(notification?.referenceId);
    }
    if (actionPathName == "Post" && notification?.referenceId) {
      navigate(`/Feed/${notification?.referenceId}`);
    }

    if (notification?.id) {
      Notification.UpdateNotification(notification?.id, false);
    }
  };

  const deleteNotification = () => {
    if (notification?.id) {
      Notification.UpdateNotification(notification?.id, true);
    }
  };

  return (
    <>
      <div>
        <div className={`${colors.ElementFrame} h-20 w-48 p-2 m-1 relative`}>
          <div className="absolute top-1 right-0">
            <button
              className={`${colors.CommentColors}`}
              onClick={deleteNotification}
            >
              <Tooltip title="delete">
                <IoClose size={18} />
              </Tooltip>
            </button>
          </div>

          <button className={`${colors.ActiveText}`} onClick={GoToUser}>
            {nameOfNotifier}
          </button>
          {notificationTypeText}
          <button
            className={`${colors.ActiveText}`}
            onClick={activateNotification}
          >
            {actionPathName}
          </button>
          <div className="text-xs absolute right-0">{notification?.date}</div>
        </div>
      </div>
    </>
  );
};

export { NotificationObject };
