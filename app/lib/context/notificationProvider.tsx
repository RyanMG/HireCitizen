import {useEffect, createContext, useRef, ReactNode, useContext, useState, RefObject, SetStateAction, Dispatch} from 'react';
import {
  getUserNotifications,
  deleteUserNotification,
  markAllNotificationsAsRead
} from '@query/notifications/actions';

import { TNotification, TNotificationType } from '@definitions/notifications';
import { NEW_USER_NOTIFICATION_BASE } from '../constants/notifications';

/**
 *
 */
const NotificationContext = createContext<{
  notifications: RefObject<TNotification> | null,
  notificationsShown: boolean,
  hasNewNotifications: boolean,
  dismissNotification: (notificationId: string, notificationType: TNotificationType) => void,
  toggleShowNotifications: Dispatch<SetStateAction<boolean>>,
  clearAllNotifications: () => void
}>({
  notifications: null,
  notificationsShown: false,
  hasNewNotifications: false,
  dismissNotification: () => {},
  toggleShowNotifications: () => {},
  clearAllNotifications: () => {}
});

const useNotifications = () => {
  return useContext(NotificationContext);
}

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

/**
 *
 */
function NotificationProvider({children}:{children: ReactNode}): ReactNode {
  const [notificationsShown, toggleShowNotifications] = useState<boolean>(false);
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  const notifications = useRef<TNotification>({
    ...NEW_USER_NOTIFICATION_BASE,
    lastNotificationCheck: new Date().toISOString()
  });

  /**
   * Dismiss a single notification.
   */
  const dismissNotification = async (notificationId: string, notificationType: TNotificationType) => {
    const response = await deleteUserNotification(notificationId, notificationType);
    if ('error' in response) {
      console.error(response.error || 'Notification was not deleted');
      return;
    }

    if (response.success) {
      pollNotifications();
    }
  }
  /**
   * Poll Upstash for new notifications.
   */
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
  /**
   * Clear all notifications for this user
   */
  const clearAllNotifications = async () => {
    const response = await markAllNotificationsAsRead();
    if ('error' in response) {
      console.error(response.error);
      return;
    }
    pollNotifications();
    toggleShowNotifications(false);
  }
  /**
   * Interval to poll for notifications.
   */
  useEffect(() => {
    pollNotifications();
    const intervalId = setInterval(() => {
      pollNotifications();
    }, 20000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      notificationsShown,
      toggleShowNotifications,
      dismissNotification,
      hasNewNotifications,
      clearAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export {useNotifications, NotificationProvider}
