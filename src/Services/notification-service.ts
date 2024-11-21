
import { request } from "../Utils/Axios-Interceptor";

const notificationURL = "/Notification";



  const UpdateNotification = (id: string, hide: boolean) =>
    request({
      url: `${notificationURL}/Update/${id}`,
      method: "Put",
      data: {input:hide},
    });

    const GetNotification = () =>
      request({
        url: `${notificationURL}`,
        method: "Get",
        data: null,
      });

      const GetNotificationById = (id: string,) =>
        request({
          url: `${notificationURL}/ByNotificationID/${id}`,
          method: "Get",
          data: null,
        });



  export const Notification = {UpdateNotification, GetNotification,GetNotificationById}