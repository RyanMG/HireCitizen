export type TNotification = {
  employeeApplicationChanges: TEmployeeApplicationChangesItem[],
  employerApplicationsIncoming: TEmployerApplicationsIncomingItem[],
  upcomingEmployeeJobs: TUpcomingEmployeeJobsItem[],
  upcomingEmployerJobs: TUpcomingEmployerJobsItem[],
  messages: TMessagesItem[]
}

export type TNotificationType = 'employeeApplicationChanges' | 'employerApplicationsIncoming' | 'upcomingEmployeeJobs' | 'upcomingEmployerJobs' | 'messages';

export type TEmployerApplicationsIncomingItem = {
  type: TNotificationType['employerApplicationsIncoming'];
  data: {
    applicationId: string,
    applicantId: string,
    jobId: string
  }
}

export type TEmployeeApplicationChangesItem = {
  type: TNotificationType['employeeApplicationChanges'];
  data: {
    applicationId: string,
    jobId: string
  }
}

export type TUpcomingEmployeeJobsItem = {
  type: TNotificationType['upcomingEmployeeJobs'];
  data: {
    jobId: string,
    startDateTime: string
  }
}

export type TUpcomingEmployerJobsItem = {
  type: TNotificationType['upcomingEmployerJobs'];
  data: {
    jobId: string,
    startDateTime: string
  }
}

export type TMessagesItem = {
  type: TNotificationType['messages'];
  data: {
    chatId: string,
    messageId: string
  }
}
