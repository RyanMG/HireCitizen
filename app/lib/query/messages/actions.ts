import { neon } from "@neondatabase/serverless";
import { TJobMessage } from "../../definitions/messages";

export const postJobMessages = async (message: string, jobId: string) => {
  const session = await auth();
  const userId = session?.activeUser?.id;
  const createdAt = new Date().toIsoString();
  
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const newMessage = await sql`
      INSERT INTO job_message
      (job_id, sender_id, content, created_at)
      VALUES (${jobId}, ${userId}, ${message}, ${createdAt})
      RETURNING *;
    `;
    return {
      ...newMessage[0],
      sender: {
        id: session?.activeUser?.id,
        handle: session?.activeUser?.handle,
        moniker: session?.activeUser?.moniker,
        rsi_url: session?.activeUser?.rsi_url
      }
    } as TJobMessage;

  } catch (error) {
    console.error(error);
    return [];
  }
};
