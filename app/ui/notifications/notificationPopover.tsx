"use client";

import clsx from "clsx";
import CloseElementIcon from "@components/iconBtns/closeIcon";
import {
  TNotification
} from "@/app/lib/definitions/notifications";

interface INotificationPopoverProps {
  notificationsShown: boolean;
  onNotificationClick: () => void;
  notifications: TNotification;
}

export default function NotificationPopover({
  notificationsShown,
  onNotificationClick,
  notifications
}: INotificationPopoverProps) {

  const notificationContent = Object.keys(notifications).reduce((output, notificationType) => {

    switch (notificationType) {
      case 'upcomingEmployeeJobs':
        notifications[notificationType].forEach((notification) => {
          output.push(<div className="text-white text-sm" key={notification.data.jobId}>{notification.data.jobId}</div>);
        });
        break;
      case 'upcomingEmployerJobs':
        notifications[notificationType].forEach((notification) => {
          output.push(<div className="text-white text-sm" key={notification.data.jobId}>{notification.data.jobId}</div>);
        });
        break;
      case 'employeeApplicationChanges':
        notifications[notificationType].forEach((notification) => {
          output.push(<div className="text-white text-sm" key={notification.data.jobId}>{notification.data.jobId}</div>);
        });
        break;
      case 'employerApplicationsIncoming':
        notifications[notificationType].forEach((notification) => {
          output.push(<div className="text-white text-sm" key={notification.data.jobId}>{notification.data.jobId}</div>);
        });
        break;
      case 'messages':
        notifications[notificationType].forEach((notification) => {
          output.push(<div className="text-white text-sm" key={notification.data.messageId}>{notification.data.messageId}</div>);
        });
        break;
    }
    return output;
  }, [] as React.ReactNode[]);

  return (
    <div>
      <div
        onClick={onNotificationClick}
        className={clsx(
        "absolute top-0 left-0 h-full bg-black",
        {
          "bg-opacity-50 w-full": notificationsShown,
          "bg-opacity-0 w-0": !notificationsShown
        }
      )}/>
      <div className={`fixed right-0 top-0 h-full transition ease-in-out duration-300 ${notificationsShown ? "translate-x-0" : "translate-x-96"}`}>
        <div className={`w-80 bg-light-blue border border-gray-300 absolute bottom-5 right-2 top-5 rounded-xl p-4`}>

          <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2">
            <div className="text-white text-lg font-bold">Notifications</div>
            <CloseElementIcon onClickFn={onNotificationClick} iconFillColor="#e8eaed" />
          </div>

          {notificationContent.length === 0 ? (
            <div className="flex flex-col justify-center items-start mt-4">
              <p className="text-white text-sm">No new notifications. Get back to work!</p>
            </div>
          ) : (
            notificationContent
          )}

        </div>
      </div>
    </div>
  );
}