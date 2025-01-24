import { neon } from "@neondatabase/serverless";
import { TJobMessage } from "../../definitions/messages";

export const getJobMessages = async (jobId: string) => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const messages = await sql`
      SELECT jm.id, jm.job_id, jm.content, jm.created_at,
      (jsonb_agg(
        jsonb_build_object(
          'id', p.id,
          'handle', p.handle,
          'moniker', p.moniker,
          'rsi_url', p.rsi_url
        )
      ))[0] as "sender"
      FROM job_message jm
      LEFT JOIN person p ON p.id = jm.sender_id
      WHERE jm.job_id = ${jobId}
      GROUP BY jm.id
      ORDER BY jm.created_at DESC
    `;
    return messages as TJobMessage[];

  } catch (error) {
    console.error(error);
    return [];
  }
};
