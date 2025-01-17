import {
  TEmployeeApplicationChangesItem,
  TEmployerApplicationsIncomingItem,
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TMessagesItem
} from "@definitions/notifications";

export const NEW_USER_NOTIFICATION_BASE = {
  employeeApplicationChanges: [] as TEmployeeApplicationChangesItem[],
  employerApplicationsIncoming: [] as TEmployerApplicationsIncomingItem[],
  upcomingEmployeeJobs: [] as TUpcomingEmployeeJobsItem[],
  upcomingEmployerJobs: [] as TUpcomingEmployerJobsItem[],
  messages: [] as TMessagesItem[]
};
