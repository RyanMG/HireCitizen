import {
  TNotificationType,
  TEmployerApplicationsIncomingItem,
  TEmployeeApplicationChangesItem,
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TMessagesItem,
  TApplicationsData,
  TUpcomingJobData,
  TMessageData
} from "@definitions/notifications";

export function buildNotificationPayload(type: TNotificationType, data: TApplicationsData | TUpcomingJobData | TMessageData):
  | TEmployerApplicationsIncomingItem
  | TEmployeeApplicationChangesItem
  | TUpcomingEmployeeJobsItem
  | TUpcomingEmployerJobsItem
  | TMessagesItem
  | null
{
  switch (type) {
    case 'employerApplicationsIncoming':
      return {
        type,
        data: data as TApplicationsData
      } as TEmployerApplicationsIncomingItem;
    case 'employeeApplicationChanges':
      return {
        type,
        data: data as TApplicationsData
      } as TEmployeeApplicationChangesItem
    case 'upcomingEmployeeJobs':
      return {
        type,
        data: data as TUpcomingJobData
      } as TUpcomingEmployeeJobsItem;
    case 'upcomingEmployerJobs':
      return {
        type,
        data: data as TUpcomingJobData
      } as TUpcomingEmployerJobsItem;
    case 'messages':
      return {
        type,
        data: data as TMessageData
      } as TMessagesItem;
    default:
      return null;
  }
}