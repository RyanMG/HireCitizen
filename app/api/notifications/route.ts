'use server';

import { NextResponse } from "next/server";
import redisClient from "@lib/singletons/redisClient";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const client = redisClient.getClient();
    const notifications = await client.hGetAll(`user:${userId}`);
    return NextResponse.json(notifications);

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({
      error: 'Error fetching notifications'
    });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const client = redisClient.getClient();
    const notifications = await client.hSet(
      `user:${userId}`,
      {
        "notifications": JSON.stringify(request.body)
      }
    )
    return NextResponse.json(notifications);

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({
      error: 'Error fetching notifications'
    });
  }
}
