import {
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TEmployeeApplicationChangesItem,
  TEmployerApplicationsIncomingItem,
  TMessagesItem
} from "@/app/lib/definitions/notifications";
import CloseIcon from "../components/iconBtns/closeIcon";
import Link from "next/link";

interface INotificationItemProps {
  notification: TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TMessagesItem;
  closeNotificationsFn: () => void;
}

const NotificationText = ({
  notification,
  closeNotificationsFn
}: INotificationItemProps) => {

  switch (notification.type) {
    case 'upcomingEmployeeJobs':
      return (
        <Link href={`/jobs/${notification.data.jobId}`} onClick={closeNotificationsFn}>
          <p className="text-gray-500">You are enrolled for a job which is starting soon.</p>
        </Link>
      );
    case 'upcomingEmployerJobs':
      return (
        <Link href={`/jobs/${notification.data.jobId}`} onClick={closeNotificationsFn}>
          <p className="text-gray-500">You have a job which is starting soon.</p>
        </Link>
      );
    case 'employeeApplicationChanges':
      return (
        <Link href={`/jobs/${notification.data.jobId}`} onClick={closeNotificationsFn}>
          <p className="text-gray-500">You have an application which has been updated.</p>
        </Link>
      );
    case 'employerApplicationsIncoming':
      return (
        <Link href={`/my-jobs/${notification.data.jobId}`} onClick={closeNotificationsFn}>
          <p className="text-gray-500">{`You have a new application for job ${notification.data.jobId}`}</p>
        </Link>
      );
    case 'messages':
      return (
        <Link href={`/messages/${notification.data.chatId}`} onClick={closeNotificationsFn}>
          <p className="text-gray-500">You have a new message.</p>
        </Link>
      );
  }
}

export default function NotificationItem({
  notification,
  closeNotificationsFn
}: INotificationItemProps) {

  return (
    <div className="flex flex-row items-center justify-between my-1 p-2 bg-light-blue border border-gray-300 rounded-md">
      {<NotificationText notification={notification} closeNotificationsFn={closeNotificationsFn} />}
      <CloseIcon
        onClickFn={closeNotificationsFn}
        iconFillColor="#AAA"
      />
    </div>
  )
}
