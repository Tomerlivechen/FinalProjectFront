import { useEffect, useState } from "react";
import { GiHummingbird } from "react-icons/gi";
import { BsEgg } from "react-icons/bs";

import { NotificationList } from "./NotificationList";
import { Tooltip } from "react-bootstrap";
import ElementFrame from "../../Constructors/ElementFrame";
import { colors } from "../../Constants/Patterns";
import { Notification } from "../../Services/notification-service";
import { INotificationDisplay } from "../../Types/@NotificationTyoe";

const NotificationAlert = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const [notifications, setNotifications] = useState<
    INotificationDisplay[] | null
  >(null);

  const getNotificatins = async () => {
    const noteList = await Notification.GetNotification();
    setNotifications(noteList.data);
  };

  useEffect(() => {
    // count unseen notifications, if relavent to show user new notification
    let unseen = 0;
    if (notifications)
      notifications.forEach((note) => {
        if (!note.seen) {
          unseen += 1;
        }
      });
    if (unseen > 0) setActive(true);
  }, [notifications]);

  const toggleList = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    getNotificatins();
  }, [open]);

  return (
    <>
      <div>
        <button
          onClick={toggleList}
          className={`${open && colors.ActiveText} ${
            active ? `mr-4 mb-8` : ``
          }`}
        >
          <Tooltip title="Notifications">
            {active ? (
              <GiHummingbird
                className="absolute animate-bounce mr-8 "
                size={30}
              />
            ) : (
              <BsEgg size={24} className="mt-3" />
            )}
          </Tooltip>
        </button>
      </div>
      {open && (
        <ElementFrame
          overflowY="auto"
          overflowX="auto"
          tailwind="absolute z-50 right-2 top-16 h-fit max-h-[50vh]"
        >
          <NotificationList />
        </ElementFrame>
      )}
    </>
  );
};

export { NotificationAlert };
