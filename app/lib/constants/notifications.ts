import {
  TNotification
} from "@definitions/notifications";

export const NEW_USER_NOTIFICATION_BASE = {
  employeeApplicationChanges: {} as TNotification['employeeApplicationChanges'],
  employerApplicationsIncoming: {} as TNotification['employerApplicationsIncoming'],
  upcomingEmployeeJobs: {} as TNotification['upcomingEmployeeJobs'],
  upcomingEmployerJobs: {} as TNotification['upcomingEmployerJobs'],
  messages: {} as TNotification['messages']
};
