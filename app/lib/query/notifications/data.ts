'use server';

import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', err => console.log('Redis Client Error', err));

await redis.connect();

await redis.set('notifications', JSON.stringify({test: 'test'}));

export async function getNotifications() {
  try {
    const notifications = await redis.get("notifications");
    return notifications;

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      error: 'Error fetching notifications'
    };
  }
}