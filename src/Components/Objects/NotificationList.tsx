import { useEffect, useState } from "react";

import { Notification } from "../../Services/notification-service";
import { NotificationObject } from "./NotificationObject";
import { INotificationDisplay } from "../../Types/@NotificationTyoe";
import { sortByProperty } from "../../Constants/Patterns";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<
    INotificationDisplay[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const getNotificatins = async () => {
    const noteList = await Notification.GetNotification();
    setNotifications(
      noteList.data.slice().sort(sortByProperty("date", "desc"))
    );
  };

  useEffect(() => {
    getNotificatins();
  }, []);

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  return (
    <>
      {!loading && notifications && (
        <div>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <NotificationObject NotificationData={notification} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { NotificationList };
