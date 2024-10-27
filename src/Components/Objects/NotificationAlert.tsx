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
    let active = 0;
    if (notifications)
      notifications.forEach((note) => {
        if (!note.seen) {
          active += 1;
        }
      });
    if (active > 0) setActive(true);
  }, [notifications]);

  const toggleList = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    getNotificatins();
  }, []);

  return (
    <>
      <div>
        <button onClick={toggleList} className={`${open && colors.ActiveText}`}>
          <Tooltip title="Notifications">
            {active ? (
              <GiHummingbird className="absolute animate-bounce " size={30} />
            ) : (
              <BsEgg size={24} className="mt-3" />
            )}
          </Tooltip>
        </button>
      </div>
      {open && (
        <ElementFrame
          overflowY="auto"
          overflowX="hidden"
          height="500px"
          tailwind="absolute z-50 right-2 top-16"
        >
          <NotificationList />
        </ElementFrame>
      )}
    </>
  );
};

export { NotificationAlert };
