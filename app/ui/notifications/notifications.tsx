"use client";

import NotificationPopover from "./notificationPopover";
import NotificationIcon from "./notificationIcon";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

export default function NotificationSnipe() {
  const [notificationsShown, showNotifications] = useState<boolean>(false);
  const { data: session } = useSession();

  const onNotificationClick = () => {
    showNotifications(!notificationsShown);
  };

  const pollNotifications = async () => {
    const res = await fetch("/api/notifications");
    console.log(res);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      pollNotifications();
    }, 20000)

    return () => clearInterval(intervalId)
  }, [])

  if (!session || !session.activeUser) {
    return null;
  }

  return (
    <div className="z-100">
      <NotificationIcon notificationsShown={notificationsShown} onNotificationClick={onNotificationClick} />
      <NotificationPopover notificationsShown={notificationsShown} onNotificationClick={onNotificationClick} />
    </div>
  );
 }
