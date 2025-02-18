'use server';

import { neon } from "@neondatabase/serverless";
import { TJobMessage } from "@definitions/messages";
import { auth } from "@/auth";
import DayJs from "dayjs";

export const postJobMessages = async (message: string, jobId: string) => {
  const session = await auth();
  const userId = session?.activeUser?.id;
  const createdAt = DayJs().toISOString();

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const newMessage = await sql`
      INSERT INTO job_message
      (job_id, sender_id, content, created_at)
      VALUES (${jobId}, ${userId}, ${message}, ${createdAt})
      RETURNING *;
    `;

    return {
      id: newMessage[0].id,
      content: newMessage[0].content,
      createdAt: newMessage[0].created_at,
      jobId: newMessage[0].job_id,
      sender: {
        id: session?.activeUser?.id,
        handle: session?.activeUser?.handle,
        moniker: session?.activeUser?.moniker,
        rsi_url: session?.activeUser?.rsi_url
      }
    } as TJobMessage;

  } catch (error) {
    console.error(error);
    return null;
  }
};
