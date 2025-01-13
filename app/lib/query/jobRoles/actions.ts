'use server';

import { neon } from "@neondatabase/serverless";
import { auth } from 'auth';
import { revalidatePath } from "next/cache";

/**
 * User applies to a crew role
 */
export async function applyToCrewRole(jobId: string, roleId: number): Promise<{submitted: boolean, message: string | null, error: string | null}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const existingApplication = await sql`SELECT id FROM job_applicants WHERE job_id = ${jobId} AND person_id = ${userId} AND crew_role_id = ${roleId}`;
    if (existingApplication.length > 0) {
      return {
        submitted: false,
        message: 'You have already applied to this role.',
        error: null
      };
    }

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
/**
 * User rescinds a crew role application
 */
export async function rescindCrewRoleApplication(jobId: string, roleId: number): Promise<{submitted: boolean, message: string | null, error: string | null}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM job_applicants WHERE job_id=${jobId} AND person_id=${userId} AND crew_role_id=${roleId}`;
    return {
      submitted: true,
      message: 'Job application rescinded.',
      error: null
    };

  } catch (error) {
    console.error(error);
    return {
      submitted: false,
      message: null,
      error: 'Database Error: Failed to rescind job application.'
    };
  }
}
/**
 * Job owner toggles a job application status
 */
export async function toggleApplicationStatus(applicationId: number, status: string): Promise<{submitted: boolean, message: string | null, error: string | null}> {

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`UPDATE job_applicants SET accepted_status=${status} WHERE id=${applicationId}`;

  } catch (error) {
    console.error(error);
    return {
      submitted: false,
      message: null,
      error: 'Database Error: Failed to update job application status.'
    };
  }

  revalidatePath('/my-jobs');
  return {
    submitted: true,
    message: 'Job application status updated.',
    error: null
  };
}
