'use server';

import { auth } from "@/auth";
import { Redis } from '@upstash/redis';

import {
  TNotification,
  TNotificationType,
  TEmployeeApplicationChangesItem,
  TEmployerApplicationsIncomingItem,
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TMessagesItem
} from "@definitions/notifications";
import {NEW_USER_NOTIFICATION_BASE} from "@constants/notifications";

/**
 * Add a user into redis for use by the notifications system
 */
export async function addUserToNotifications(userId: string): Promise<{userAdded: boolean} | {error: string}> {
  try {
    const client = Redis.fromEnv();
    const wasAdded = await client.json.set(
      `user:${userId}`,
      '$',
      JSON.stringify({
        ...NEW_USER_NOTIFICATION_BASE,
        lastNotificationCheck: new Date().toISOString()
      }),
      { nx: true }
    )

    return {
      userAdded: wasAdded === 'OK' ? true : false
    }

  } catch (error) {
    return {
      error: 'Error adding user' + error
    }
  }
}
/**
 * Remove a user from the notifications system
 */
export async function deleteUserFromNotifications(userId: string): Promise<{userDeleted: boolean} | {error: string}> {
  try {
    const client = Redis.fromEnv();
    const wasDeleted = await client.json.del(
      `user:${userId}`
    )

    return {
      userDeleted: wasDeleted === 1 ? true : false
    }

  } catch (error) {
    return {
      error: 'Error removing user' + error
    }
  }
}
/**
 * Get a user's notifications from redis
 */
export async function getUserNotifications(): Promise<TNotification | {error: string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  if (!userId) {
    return {
      error: 'No user session found'
    }
  }

  try {
    const client = Redis.fromEnv();
    const notifications = await client.json.get(`user:${userId}`);

    await client.json.set(`user:${userId}`, '$.lastNotificationCheck', `"${new Date().toISOString()}"`);

    return notifications as unknown as TNotification;

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      error: 'Error fetching notifications'
    };
  }
}
/**
 * Add a notification to a user's notifications
 */
export async function addUserNotification({
  userId,
  type,
  payload
}: {
  userId: string,
  type: TNotificationType,
  payload: TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TMessagesItem
}): Promise<{success: boolean} | {error: string}> {

  try {
    const client = Redis.fromEnv();
    const notificationId = crypto.randomUUID().replace(/-/g, '');
    const payloadString = JSON.stringify({
      ...payload,
      id: notificationId
    });

    const notifications = await client.json.set(
      `user:${userId}`,
      `$.${type}.${notificationId}`,
      payloadString
    )

    return {
      success: notifications === 'OK' ? true : false
    };

  } catch (error) {
    console.error('Error updating notifications:', error);
    return {
      error: 'Error updating notifications'
    };
  }
}

export async function deleteUserNotification(notificationId: string, notificationType: TNotificationType): Promise<{success: boolean} | {error: string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  if (!userId) {
    return {
      error: 'No user session found'
    }
  }

  try {
    const client = Redis.fromEnv();
    const wasDeleted = await client.json.del(`user:${userId}`, `$.${notificationType}.${notificationId}`);
    return {
      success: wasDeleted === 1 ? true : false
    };

  } catch (error) {
    console.error('Error deleting notification:', error);
    return {
      error: 'Error deleting notification'
    };
  }
}

export async function deleteUserNotificationWithoutId(notificationType: TNotificationType, notificationTargetUserId: string, keysToFindNotification: {jobId: string}|{messageId: string}): Promise<{success: boolean} | {error: string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  if (!userId) {
    return {
      error: 'No user session found'
    }
  }

  try {
    const client = Redis.fromEnv();
    const notificationsResponse: Record<string, TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TMessagesItem>[]|null = await client.json.get(`user:${notificationTargetUserId}`, `$.${notificationType}`);
    if (!notificationsResponse) {
      return {
        error: 'No notifications found for the provided user'
      };
    }

    const notifications: Record<string, TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TMessagesItem> = notificationsResponse[0];
    const notificationId = Object.keys(notifications).find((key: string) => {
      switch (notificationType) {
        case 'employeeApplicationChanges':
        case 'employerApplicationsIncoming':
        case 'upcomingEmployeeJobs':
        case 'upcomingEmployerJobs':
          return 'jobId' in keysToFindNotification && notifications[key].data.jobId === keysToFindNotification.jobId;

        case 'messages':
          return 'messageId' in keysToFindNotification && notifications[key].data.messageId === keysToFindNotification.messageId;
        default:
          return false;
      }
    });

    if (!notificationId) {
      return {
        error: 'No notification found for the provided user'
      };
    }

    const wasDeleted = await client.json.del(`user:${notificationTargetUserId}`, `$.${notificationType}.${notificationId}`);
    return {
      success: wasDeleted === 1 ? true : false
    };

  } catch (error) {
    console.error('Error deleting notification:', error);
    return {
      error: 'Error deleting notification'
    };
  }
}
