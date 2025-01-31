'use server';

import { neon } from "@neondatabase/serverless";
import { TCrewRole, TJobApplicant } from "@/app/lib/definitions/job";
import { TPerson } from "@/app/lib/definitions/person";
import dayjs from "dayjs";

/**
 * Get applications for given user and given job. Used for a user seeing their application status for a job.
 */
export async function getJobApplicationStatus(jobId: string, user: TPerson): Promise<TJobApplicant | {error:string} | null> {
  if (!user) {
    return null;
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const applicant = await sql`SELECT DISTINCT ON (job_id) * FROM job_applicants WHERE job_id = ${jobId} and person_id = ${user.id}`;

    if (applicant.length === 0) {
      return null;
    }

    return {
      id: applicant[0].id,
      jobId: applicant[0].job_id,
      person: user as TPerson,
      crewRole: {
        id: applicant[0].crew_role_id
      } as TCrewRole,
      acceptedStatus: applicant[0].accepted_status
    } as TJobApplicant;

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get job application status' };
  }

}
/**
 * Gets all applications for a given user
 */
export async function getUserJobApplications(user: TPerson, statusList: ('PENDING' | 'REJECTED' | 'ACCEPTED')[]): Promise<TJobApplicant[] | {error:string}> {
  const now = dayjs().startOf('day').toDate();
  try {
    const sql = neon(process.env.DATABASE_URL!);
    return await sql`
      SELECT ja.id, ja.accepted_status as "acceptedStatus",
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
            'employee_reputation', p.employee_reputation
          )
        ))[0] as "person",
        (jsonb_agg(
          jsonb_build_object(
            'id', j.id,
            'title', j.title,
            'description', j.description,
            'status', j.status,
            'owner', jsonb_build_object(
              'id', o.id,
              'handle', o.handle,
              'moniker', o.moniker,
              'rsi_url', o.rsi_url,
              'employer_reputation', o.employer_reputation
            )
          )
        ))[0] as "job"
        FROM job_applicants ja
        JOIN person p ON p.id = ja.person_id
        JOIN crew_roles cr ON cr.id = ja.crew_role_id
        JOIN job j ON j.id = ja.job_id
        JOIN person o ON o.id = j.owner_id
        WHERE ja.person_id = ${user.id} AND ja.accepted_status = ANY(${statusList}) AND j.job_start >= ${now}
        GROUP BY ja.id;
      ` as TJobApplicant[];

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get user job applications' };
  }
}

/**
 * Get all jobs that a user has been a part of.
 */
export async function getUserPastJobs(user: TPerson): Promise<TJobApplicant[] | {error:string}> {
  const dateRef = dayjs().startOf('day').subtract(1, 'day').toDate();

  try {
    const sql = neon(process.env.DATABASE_URL!);
    return await sql`
      SELECT ja.id,
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
            'employee_reputation', p.employee_reputation
          )
        ))[0] as "person",
        (jsonb_agg(
          jsonb_build_object(
            'id', j.id,
            'title', j.title,
            'description', j.description,
            'status', j.status,
            'owner', jsonb_build_object(
              'id', o.id,
              'handle', o.handle,
              'moniker', o.moniker,
              'rsi_url', o.rsi_url,
              'employer_reputation', o.employer_reputation
            )
          )
        ))[0] as "job"
        FROM job_applicants ja
        JOIN person p ON p.id = ja.person_id
        JOIN crew_roles cr ON cr.id = ja.crew_role_id
        JOIN job j ON j.id = ja.job_id
        JOIN person o ON o.id = j.owner_id
        WHERE ja.person_id = ${user.id} AND ja.accepted_status = 'ACCEPTED' AND j.job_start <= ${dateRef}
        GROUP BY ja.id;
      ` as TJobApplicant[];

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get user job applications' };
  }
}

/**
 * Get all applicants for a given job. Used for a job owner to see all applicants for a job.
 */
export async function getJobApplicants(jobId: string): Promise<TJobApplicant[] | {error:string}> {
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
            'employee_reputation', p.employee_reputation
          )
        ))[0] as "person"
        FROM job_applicants ja
        JOIN person p ON p.id = ja.person_id
        JOIN crew_roles cr ON cr.id = ja.crew_role_id
        WHERE ja.job_id = ${jobId}
        GROUP BY ja.id;
    ` as TJobApplicant[];

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get job applicants' };
  }
}

/**
 * Get all applicants for a given job. Who have been ACCEPTED for the job.
 */
export async function getAcceptedCrewMembers(jobId: string): Promise<TJobApplicant[] | {error:string}> {

  try {
    const sql = neon(process.env.DATABASE_URL!);
    return await sql`
      SELECT ja.id, ja.job_id as "jobId",
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
            'employee_reputation', p.employee_reputation
          )
        ))[0] as "person"
        FROM job_applicants ja
        LEFT JOIN person p ON p.id = ja.person_id
        LEFT JOIN crew_roles cr ON cr.id = ja.crew_role_id
        WHERE ja.job_id = ${jobId}
        AND ja.accepted_status = 'ACCEPTED'
        GROUP BY ja.id;
    ` as TJobApplicant[];

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get current crew members' };
  }
}
