"use client";

import NotificationPopover from "./notificationPopover";
import NotificationIcon from "./notificationIcon";
import { useEffect, useRef, useState } from "react";
import { getUserNotifications } from "@/app/lib/query/notifications/actions";
import {
  TNotification
} from "@definitions/notifications";
import { NEW_USER_NOTIFICATION_BASE } from "@/app/lib/constants/notifications";

export default function NotificationSnipe() {
  const [notificationsShown, showNotifications] = useState<boolean>(false);
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  const notifications = useRef<TNotification>(NEW_USER_NOTIFICATION_BASE);

  const onNotificationClick = () => {
    showNotifications(!notificationsShown);
  };

  const parseNotificationResponseForChanges = (incomingNotifications: TNotification) => {
    const {
      upcomingEmployeeJobs,
      upcomingEmployerJobs,
      employeeApplicationChanges,
      employerApplicationsIncoming,
      messages
    } = incomingNotifications;

    return upcomingEmployeeJobs.length > 0 || upcomingEmployerJobs.length > 0 || employeeApplicationChanges.length > 0 || employerApplicationsIncoming.length > 0 || messages.length > 0;
  }

  const pollNotifications = async () => {
    const notificationResponse = await getUserNotifications();
    console.log(notificationResponse);

    if ('error' in notificationResponse) {
      console.error(notificationResponse.error);
      return;
    }

    const hasChanges = parseNotificationResponseForChanges(notificationResponse);
    notifications.current = notificationResponse;
    setHasNewNotifications(hasChanges);
  }

  useEffect(() => {
    pollNotifications();
    const intervalId = setInterval(() => {
      pollNotifications();
    }, 20000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="z-100">
      <NotificationIcon notificationsShown={notificationsShown} onNotificationClick={onNotificationClick} hasNewNotifications={hasNewNotifications} />
      <NotificationPopover
        notificationsShown={notificationsShown}
        onNotificationClick={onNotificationClick}
        notifications={notifications.current}
      />
    </div>
  );
 }
