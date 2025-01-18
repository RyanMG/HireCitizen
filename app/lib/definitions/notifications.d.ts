export type TNotification = {
  employeeApplicationChanges: TEmployeeApplicationChangesItem[],
  employerApplicationsIncoming: TEmployerApplicationsIncomingItem[],
  upcomingEmployeeJobs: TUpcomingEmployeeJobsItem[],
  upcomingEmployerJobs: TUpcomingEmployerJobsItem[],
  messages: TMessagesItem[]
}

export type TNotificationType = 'employeeApplicationChanges' | 'employerApplicationsIncoming' | 'upcomingEmployeeJobs' | 'upcomingEmployerJobs' | 'messages';

/**
 * Job Application notifications
 */
export type TApplicationsData = {
  applicationId: string,
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
