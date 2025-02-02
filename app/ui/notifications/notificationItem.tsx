'use client';

import {
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TEmployeeApplicationChangesItem,
  TEmployerApplicationsIncomingItem,
  TMessagesItem,
  TNotificationType
} from "@definitions/notifications";
import Button from "@components/button";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";
import { useNotifications } from "@context/notificationProvider";

interface INotificationItemProps {
  notification: TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TMessagesItem;
}
/**
 *
 */
const NotificationText = (notificationType: TNotificationType): ReactNode => {
  switch (notificationType) {
    case 'upcomingEmployeeJobs':
      return (
          <p className="text-gray-500">You are enrolled for a job which is starting soon.</p>
      );
    case 'upcomingEmployerJobs':
      return (
          <p className="text-gray-500">You have a job which is starting soon.</p>
      );
    case 'employeeApplicationChanges':
      return (
          <p className="text-gray-500">You have an application which has been updated.</p>
      );
    case 'employerApplicationsIncoming':
      return (
          <p className="text-gray-200 text-sm">You have a new application for one of your jobs.</p>
      );
    case 'messages':
      return (
          <p className="text-gray-500">You have a new message.</p>
      );
    default:
      return null;
  }
}

const getNotificationLink = (notification: TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TMessagesItem): string => {
  switch (notification.type) {
    case 'upcomingEmployeeJobs':
      return `/jobs/${notification.data.jobId}`;
    case 'upcomingEmployerJobs':
      return `/jobs/${notification.data.jobId}`;
    case 'employeeApplicationChanges':
      return `/job/${notification.data.jobId}`;
    case 'employerApplicationsIncoming':
      return `/job/${notification.data.jobId}`;
    case 'messages':
      return `/messages/${notification.data.chatId}`;
    default:
      return '';
  }
}

export default function NotificationItem({
  notification
}: INotificationItemProps) {

  const router = useRouter();
  const { dismissNotification, toggleShowNotifications } = useNotifications();

  return (
    <div className="flex flex-col justify-between gap-2 my-1 p-2 bg-light-blue border border-gray-300 rounded-md">
      {NotificationText(notification.type)}
      <div className="flex flex-row justify-between gap-2">
        <Button
          theme="primary"
          onClick={() => {
            toggleShowNotifications(false);
            router.push(getNotificationLink(notification));
            dismissNotification(notification.id, notification.type);
          }}
          label="View"
        />
        <Button
          theme="secondary"
          onClick={() => {
            dismissNotification(notification.id, notification.type);
          }}
          label="Dismiss"
        />
      </div>
    </div>
  )
}
