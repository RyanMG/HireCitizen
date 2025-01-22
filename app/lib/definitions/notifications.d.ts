export type TNotification = {
  employeeApplicationChanges: Record<string, TEmployeeApplicationChangesItem>,
  employerApplicationsIncoming:  Record<string, TEmployerApplicationsIncomingItem>,
  upcomingEmployeeJobs: Record<string, TUpcomingEmployeeJobsItem>,
  upcomingEmployerJobs: Record<string, TUpcomingEmployerJobsItem>,
  messages: Record<string, TMessagesItem>,
  lastNotificationCheck: string
}

export type TNotificationType = 'employeeApplicationChanges' | 'employerApplicationsIncoming' | 'upcomingEmployeeJobs' | 'upcomingEmployerJobs' | 'messages';

/**
 * Job Application notifications
 */
export type TApplicationsData = {
  applicationId: number,
  applicantId: string,
  jobId: string
}

export type TEmployerApplicationsIncomingItem = {
  id: string
  type: TNotificationType['employerApplicationsIncoming'];
  data: TEmployerApplicationsData
}

export type TEmployeeApplicationChangesItem = {
  id: string
  type: TNotificationType['employeeApplicationChanges'];
  data: TApplicationsData
}

/**
 * Upcoming job notifications
 */
export type TUpcomingJobData = {
  jobId: string,
  startDateTime: string,
}

export type TUpcomingEmployeeJobsItem = {
  id: string,
  type: TNotificationType['upcomingEmployeeJobs'];
  data: TUpcomingJobData
}

export type TUpcomingEmployerJobsItem = {
  id: string,
  type: TNotificationType['upcomingEmployerJobs'];
  data: TUpcomingJobData
}

/**
 * Message notifications
 */
type TMessageData = {
  chatId: string,
  messageId: string
}

export type TMessagesItem = {
  id: string,
  type: TNotificationType['messages'];
  data: TMessageData
}

// SAMPLE NOTIFICATION CATEGORY
// "employerApplicationsIncoming": {
//   "89ca8c0c767a4618b6a9b0c405b69721": {
//     "data": {
//       "jobId": "f4677c20-ef7d-4825-b71d-d80c956f4925",
//       "applicationId": 2,
//       "applicantId": "190f7b2b-e9b4-451a-b22a-3bfc5c196b53"
//     },
//     "id": "89ca8c0c-767a-4618-b6a9-b0c405b69721",
//     "type": "employerApplicationsIncoming"
//   }
// }
