'use server';

import { neon } from "@neondatabase/serverless";
import { CrewRole, JobApplicant } from "@definitions/job";
import { Person } from "@definitions/person";

/**
 * Get applications for given user and given job. Used for a user seeing their application status for a job.
 */
export async function getJobApplicationStatus(jobId: string, user: Person): Promise<JobApplicant | null> {
  if (!user) {
    return null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  const applicant = await sql`SELECT DISTINCT ON (job_id) * FROM job_applicants WHERE job_id = ${jobId} and person_id = ${user.id}`;

  if (applicant.length === 0) {
    return null;
  }

  return {
    id: applicant[0].id,
    jobId: applicant[0].job_id,
    person: user as Person,
    crewRole: {
      id: applicant[0].crew_role_id
    } as CrewRole,
    acceptedStatus: applicant[0].accepted_status
  } as JobApplicant;
}

/**
 * Get all applicants for a given job. Used for a job owner to see all applicants for a job.
 */
export async function getJobApplicants(jobId: string): Promise<JobApplicant[] | {error:string}> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    return await sql`
      SELECT ja.id, ja.job_id as "jobId", ja.accepted_status as "acceptedStatus",
        (jsonb_agg(
          jsonb_build_object(
            'id', cr.id,
            'name', cr.name,
            'description', cr.description
          )
        ))[0] as "crewRole",
        (jsonb_agg(
          jsonb_build_object(
            'id', p.id,
            'handle', p.handle,
            'moniker', p.moniker,
            'rsi_url', p.rsi_url,
            'reputation', p.reputation
          )
        ))[0] as "person"
        FROM job_applicants ja
        JOIN person p ON p.id = ja.person_id
        JOIN crew_roles cr ON cr.id = ja.crew_role_id
        WHERE ja.job_id = ${jobId}
        GROUP BY ja.id;
    ` as JobApplicant[];

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get job applicants' };
  }
}
