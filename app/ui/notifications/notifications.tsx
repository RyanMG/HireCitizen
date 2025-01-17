"use client";

import NotificationPopover from "./notificationPopover";
import NotificationIcon from "./notificationIcon";
import { useEffect, useState } from "react";

export default function NotificationSnipe() {
  const [notificationsShown, showNotifications] = useState<boolean>(false);

  const onNotificationClick = () => {
    showNotifications(!notificationsShown);
  };

  // const pollNotifications = async () => {
  //   const res = await getUserNotifications();
  //   console.log(res);
  // }

  useEffect(() => {
    // pollNotifications();
    // const intervalId = setInterval(() => {
    //   pollNotifications();
    // }, 20000)

    // return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="z-100">
      <NotificationIcon notificationsShown={notificationsShown} onNotificationClick={onNotificationClick} />
      <NotificationPopover notificationsShown={notificationsShown} onNotificationClick={onNotificationClick} />
    </div>
  );
 }
