'use server';

import { neon } from "@neondatabase/serverless";
import { JobApplicant } from "@definitions/job";

/**
 * Get applications for given user and given job. Used for a user seeing their application status for a job.
 */
export async function getJobApplicationStatus(jobId: string, userId: string): Promise<JobApplicant | null> {
  if (!userId) {
    return null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  const applicant = await sql`SELECT DISTINCT ON (job_id) * FROM job_applicants WHERE job_id = ${jobId} and person_id = ${userId}`;

  if (applicant.length === 0) {
    return null;
  }

  return {
    id: applicant[0].id,
    jobId: applicant[0].job_id,
    personId: applicant[0].person_id,
    crewRoleId: applicant[0].crew_role_id,
    acceptedStatus: applicant[0].accepted_status
  } as JobApplicant;
}

/**
 * Get all applicants for a given job. Used for a job owner to see all applicants for a job.
 */
export async function getJobApplicants(jobId: string): Promise<JobApplicant[]> {
  const sql = neon(process.env.DATABASE_URL!);
  const applicants = await sql`SELECT * FROM job_applicants WHERE job_id = ${jobId}`;
  return applicants as JobApplicant[];
}
