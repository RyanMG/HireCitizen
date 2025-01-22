"use client";

import NotificationPopover from "./notificationPopover";
import NotificationIcon from "./notificationIcon";
import { useEffect, useRef, useState } from "react";
import { getUserNotifications } from "@query/notifications/actions";
import {
  TNotification
} from "@definitions/notifications";
import { NEW_USER_NOTIFICATION_BASE } from "@constants/notifications";

export default function NotificationSnipe() {
  const [notificationsShown, showNotifications] = useState<boolean>(false);
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  const notifications = useRef<TNotification>(NEW_USER_NOTIFICATION_BASE);

  const closeNotificationsFn = () => {
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

    return Object.keys(upcomingEmployeeJobs).length > 0 || Object.keys(upcomingEmployerJobs).length > 0 || Object.keys(employeeApplicationChanges).length > 0 || Object.keys(employerApplicationsIncoming).length > 0 || Object.keys(messages).length > 0;
  }

  const pollNotifications = async () => {
    const notificationResponse = await getUserNotifications();

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
      <NotificationIcon notificationsShown={notificationsShown} closeNotificationsFn={closeNotificationsFn} hasNewNotifications={hasNewNotifications} />
      <NotificationPopover
        notificationsShown={notificationsShown}
        closeNotificationsFn={closeNotificationsFn}
        notifications={notifications.current}
      />
    </div>
  );
 }
