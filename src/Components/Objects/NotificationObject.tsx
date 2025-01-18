import { useEffect, useState } from "react";

import { colors } from "../../Constants/Patterns";
import { auth } from "../../Services/auth-service";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../CustomHooks/useChat";
import { Notification } from "../../Services/notification-service";
import { IoClose } from "react-icons/io5";
import { Tooltip } from "react-bootstrap";
import { INotificationDisplay } from "../../Types/@NotificationTyoe";
import { Posts } from "../../Services/post-service";
import { IPostDisplay } from "../../Models/Interaction";

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
  const [postDisplay, setPostDisplay] = useState<IPostDisplay | null>(null);

  useEffect(() => {
    getNotificationData();
  }, [notification]);

  const getNotificationData = async () => {
    if (notification) {
      const Notifier = await auth.getUser(notification.notifierId);
      // sets type of notificatioin according to notification properties
      setNameOfNotifier(Notifier.data.userName);
      if (notification.type == "Comment") {
        const post = await Posts.getPostById(notification.referenceId);
        setPostDisplay(post.data);
        setNotificationTypeText(" has commented on your post ");
        setActionPathName("Post");
      }
      if (notification.type == "Message") {
        setNotificationTypeText(" has sent you a message ");
        setActionPathName("Chat");
      }
    }
  };

  const GoToUser = () => {
    navigate(`/profile?userId=${notification?.notifierId}`);
  };

  useEffect(() => {
    if (NotificationData) {
      setNotification(NotificationData);
    }
  }, [NotificationData]);

  // do the approrate action for the notification, open post or chat
  const activateNotification = async () => {
    if (notification?.id) {
      await Notification.UpdateNotification(notification?.id, false);
    }
    if (actionPathName == "Chat" && notification?.referenceId) {
      chatContext.addChat(notification?.referenceId);
    }
    if (actionPathName == "Post" && notification?.referenceId) {
      navigate(`/feed?postId=${notification?.referenceId}`);
    }
    GetSingleNotification();
  };

  const deleteNotification = async () => {
    if (notification?.id) {
      const response = await Notification.UpdateNotification(
        notification?.id,
        true
      );
      if (response.status === 200) {
        setNotification(null);
      }
    }
  };

  const GetSingleNotification = async () => {
    if (notification?.id) {
      const response = await Notification.GetNotificationById(notification?.id);
      if (response.status === 200) {
        setNotification(response.data);
      }
    }
  };

  return (
    <>
      {notification && (
        <div className={`${!notification.seen ? "bg-lime-500" : ""}`}>
          <div className={`${colors.ElementFrame} h-24 w-64 p-2 m-1 relative`}>
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
              {" "}
              {postDisplay && postDisplay.title.slice(0, 15)}
              {postDisplay && postDisplay.title.length > 15 && "..."}
            </button>
            <div className="text-xs absolute right-0">{notification?.date}</div>
          </div>
        </div>
      )}
    </>
  );
};

export { NotificationObject };
