'use server';

import { auth } from "@/auth";
import redisClient from "@lib/redisClient";
import {
  TNotification,
  TNotificationType,
  TEmployeeApplicationChangesItem,
  TEmployerApplicationsIncomingItem,
  TUpcomingEmployeeJobsItem,
  TUpcomingEmployerJobsItem,
  TMessagesItem
} from "@definitions/notifications";

const newUserJSONBase = {
  employeeApplicationChanges: [] as TEmployeeApplicationChangesItem[],
  employerApplicationsIncoming: [] as TEmployerApplicationsIncomingItem[],
  upcomingEmployeeJobs: [] as TUpcomingEmployeeJobsItem[],
  upcomingEmployerJobs: [] as TUpcomingEmployerJobsItem[],
  messages: [] as TMessagesItem[]
}

/**
 * Add a user into redis for use by the notifications system
 */
export async function addUserToNotifications(userId: string): Promise<{userAdded: boolean} | {error: string}> {
  try {
    const client = redisClient.getClient();
    const wasAdded = await client.call(
      'JSON.SET',
      `user:${userId}`,
      '$',
      JSON.stringify({
        ...newUserJSONBase,
        lastNotificationCheck: new Date().toISOString()
      }),
      'NX'
    )

    console.log('wasAdded', wasAdded);

    return {
      userAdded: wasAdded === 1 ? true : false
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
    const client = redisClient.getClient();
    const wasDeleted = await client.call(
      'JSON.DEL',
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
  const userId = session?.user?.id;

  if (!userId) {
    return {
      error: 'No user session found'
    }
  }

  try {
    const client = redisClient.getClient();

    const notifications = await client.get(`users:${userId}`);
    await client.call('JSON.SET', `user:${userId}`, '$.lastNotificationCheck', `"${new Date().toISOString()}"`);

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
  data
}: {
  userId: string,
  type: TNotificationType,
  data: TEmployeeApplicationChangesItem | TEmployerApplicationsIncomingItem | TUpcomingEmployeeJobsItem | TUpcomingEmployerJobsItem | TMessagesItem
}): Promise<{success: boolean} | {error: string}> {

  try {
    const client = redisClient.getClient();
    const notifications = await client.call(
      'JSON.SET',
      `user:${userId}`,
      `$.${type}`,
      JSON.stringify(data)
    )

    console.log('notifications', notifications);

    return {
      success: true
    };

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      error: 'Error fetching notifications'
    };
  }
}
