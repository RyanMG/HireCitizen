'use server';

import { neon } from "@neondatabase/serverless";
import { auth } from 'auth';

export async function applyToCrewRole(jobId: string, roleId: number): Promise<{submitted: boolean, message: string | null, error: string | null}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`INSERT INTO job_applicants (job_id, person_id, crew_role_id, accepted_status) VALUES (${jobId}, ${userId}, ${roleId}, 'PENDING')`;
    return {
      submitted: true,
      message: 'Job application submitted.',
      error: null
    };

  } catch (error) {
    console.error(error);
    return {
      submitted: false,
      message: null,
      error: 'Database Error: Failed to submit job application.'
    };
  }
}
