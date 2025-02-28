'use server';

import { neon } from "@neondatabase/serverless";
import { TCrewRole, TJob, TJobType, TJobTypeCategory } from "@/app/lib/definitions/job";
import { TPerson, TPersonLanguage } from "@/app/lib/definitions/person";
import { TTimezone } from "@definitions/misc";
import { auth } from "@/auth";
import dayjs from "dayjs";

const JOB_SEARCH_RESULTS_PER_PAGE = 8;

/**
 * Search jobs by a search term.
 */
export async function searchJobsPaginated(searchTerm: string = "", currentPage: number = 1): Promise<TJob[] | {error:string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const pageOffset = (currentPage - 1) * JOB_SEARCH_RESULTS_PER_PAGE;
    const queryLike = `%${searchTerm}%`;
    let jobData = [];

    if (!userId) {
      /**
        When the user is not logged in: get all jobs that:
        - The job is active
        - The job is public
      */
      jobData = await sql`
        SELECT DISTINCT ON (j.id) j.id, j.title, j.description, j.created_at,
        p.id AS person_id, p.moniker,
        jt.id AS jobtype_id, jt.name AS job_type_name
        FROM job j
        LEFT JOIN person p ON j.owner_id = p.id
        LEFT JOIN job_type jt ON j.job_type_id = jt.id
        WHERE j.title ILIKE ${queryLike}
        AND j.status = 'ACTIVE'
        AND j.job_privacy = 'PUBLIC'
        AND j.job_start >= CURRENT_TIMESTAMP
        ORDER BY j.id, j.created_at DESC
        LIMIT ${JOB_SEARCH_RESULTS_PER_PAGE} OFFSET ${pageOffset};`

      } else {

      /**
        Get all jobs that:
        - The user is not the owner of the job
        - The job is active
        - The job is public
          - OR the job is friends only and the user is friends with the owner
          - OR the job is organization only and the owner is in the user's organization
        - The owner is not blocked by the user and the user is not blocked by the owner
      */
      jobData = await sql`
        SELECT DISTINCT ON (j.id) j.id, j.title, j.description, j.created_at,
        p.id AS person_id, p.moniker,
        jt.id AS jobtype_id, jt.name AS job_type_name
        FROM job j
        LEFT JOIN person p ON j.owner_id = p.id
        LEFT JOIN job_type jt ON j.job_type_id = jt.id
        LEFT JOIN friends f ON (f.person_1_id = ${userId} AND f.person_2_id = j.owner_id) OR (f.person_2_id = ${userId} AND f.person_1_id = j.owner_id)
        LEFT JOIN player_org_person_join pop1 ON (pop1.person_id = ${userId})
        LEFT JOIN player_org_person_join pop2 ON (pop2.person_id = j.owner_id AND pop2.player_org_id = pop1.player_org_id)
        LEFT JOIN person_blocked pbl ON (pbl.person_id = ${userId} AND pbl.blocked_person_id = j.owner_id) OR (pbl.person_id = j.owner_id AND pbl.blocked_person_id = ${userId})
        WHERE j.title ILIKE ${queryLike}
        AND j.owner_id != ${userId}
        AND j.status = 'ACTIVE'
        AND j.job_start >= CURRENT_TIMESTAMP
        AND (
          j.job_privacy = 'PUBLIC'
          OR (j.job_privacy = 'FRIENDS' AND f.id IS NOT NULL)
          OR (j.job_privacy = 'ORG' AND pop2.id IS NOT NULL)
        )
        AND pbl.id IS NULL
        ORDER BY j.id, j.created_at DESC
        LIMIT ${JOB_SEARCH_RESULTS_PER_PAGE} OFFSET ${pageOffset};`
    }

    const jobs = jobData.map<TJob>(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      isBookmarked: row.is_bookmarked,
      isFlagged: row.is_flagged,
      createdAt: row.created_at,
      owner: {
        id: row.person_id,
        moniker: row.moniker
      } as TPerson,
      jobType: {
        id: row.jobtype_id,
        name: row.job_type_name as TJobType['name']
      } as unknown as TJobType
    }));

    return jobs;

  } catch (error) {
    console.error(error);
    return { error: `Database Error: Failed to get jobs from search ${searchTerm}`};
  }
}
/**
 * Get a single job by its id.
 */
export async function getJobById(jobId: string): Promise<TJob | {error:string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const jobData = await sql`
      SELECT j.*, TO_CHAR(j.job_start, 'YYYY-MM-DD HH24:MI:SS') as job_start,
      p.id AS person_id, p.moniker,
      jt.id as jobtype_id, jt.name AS job_type_name, jt.description AS job_type_description,
      l.code AS language_code, l.name AS language_name,
      jb.id IS NOT NULL as is_bookmarked,
      jf.id IS NOT NULL as is_flagged
      FROM job j
      LEFT JOIN person p ON j.owner_id = p.id
      LEFT JOIN job_type jt ON j.job_type_id = jt.id
      LEFT JOIN language l ON j.language_id = l.id
      LEFT JOIN job_bookmark jb ON j.id = jb.job_id AND jb.person_id = ${userId}
      LEFT JOIN job_flag jf ON j.id = jf.job_id AND jf.person_id = ${userId}
      WHERE j.id = ${jobId};`

    const job = jobData && jobData[0];

    if (job) {
      const jobRoles = await sql`
        SELECT jcrj.*,
        cr.id as crew_role_id, cr.name as crew_role_name, cr.description as crew_role_description
        FROM job_crew_role_join jcrj
        LEFT JOIN crew_roles cr ON jcrj.crew_role_id = cr.id
        WHERE jcrj.job_id = ${job.id}
        ORDER BY cr.name DESC;`

      // @TODO populate and fetch role requirements

      const jobResp = {
        id: job.id,
        title: job.title,
        description: job.description,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
        jobStart: job.job_start,
        estimatedTime: job.estimated_time,
        isBookmarked: job.is_bookmarked,
        isFlagged: job.is_flagged,
        jobReputationGate: job.reputation_gate,
        jobPrivacy: job.job_privacy,
        owner: {
          id: job.owner_id,
          moniker: job.moniker
        } as TPerson,
        jobType: {
          id: job.jobtype_id,
          name: job.job_type_name,
          description: job.job_type_description
        } as TJobType,
        language: {
          code: job.language_code,
          name: job.language_name
        } as TPersonLanguage,
        crewRoles: jobRoles.map(role => {
          return {
            id: role.crew_role_id,
            jobId: role.job_id,
            name: role.crew_role_name,
            description: role.crew_role_description,
            requestedCount: role.crew_role_requested_count,
            filledCount: role.crew_role_filled_count
          } as TCrewRole
        })
      } as TJob;

      return jobResp;
    }

    return { error: `Database Error: Failed to find matching job for ${jobId}`};

  } catch (error) {
    console.error(error);
    return { error: `Database Error: Failed to get job ${jobId}`};
  }
}
/**
 * Get the job type categories.
 */
export async function getJobTypeCategories(): Promise<TJobTypeCategory[] | {error:string}> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM job_type` as TJobTypeCategory[];
    return data;

  } catch {
    return { error: 'Database Error: Failed to get job categories.' };
  }
}
/**
 *
 */
export async function getCrewRoles(jobTypeId: number): Promise<TCrewRole[] | {error:string}> {

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM crew_roles WHERE id = ANY (
      SELECT crew_role_id FROM job_type_crew_role_join WHERE job_type_id = ${jobTypeId}
    ) OR id = 1` as TCrewRole[];

    return data;

  } catch (error) {
    console.error(error);
    return { error: 'Database Error: Failed to get crew roles.' };
  }
}
/**
 * Get the timezones.
 */
export async function getTimezones(): Promise<TTimezone[] | {message:string}> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM time_zones` as TTimezone[];
    return data;

  } catch {
    return { message: 'Database Error: Failed to get time zones data.' };
  }
}

export async function getMyJobs(jobStatusList: string[]): Promise<TJob[] | {error:string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;

  const oneHourFromNow = dayjs().add(1, 'hour').toDate();

  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (jobStatusList.length === 0 || jobStatusList.length > 4) {
      return { error: 'Invalid job status list.' };
    }

    return await sql`
      SELECT j.*,
      TO_CHAR(j.job_start, 'YYYY-MM-DD HH24:MI:SS') as "jobStart",
      COALESCE(NULLIF(jsonb_agg(
        CASE WHEN cr.name IS NOT NULL THEN
          jsonb_build_object(
            'id', cr.id,
            'name', cr.name,
            'description', cr.description
          )
        END
      ), '[null]'), '[]'::jsonb) AS "crewRoles"
      FROM job j
      LEFT JOIN job_crew_role_join jcrj ON j.id = jcrj.job_id
      LEFT JOIN crew_roles cr ON jcrj.crew_role_id = cr.id
      WHERE owner_id = ${userId}
      AND status = ANY(${jobStatusList})
      AND j.job_start >= ${oneHourFromNow}
      GROUP BY j.id
      ORDER BY created_at DESC;` as TJob[];

  } catch (error) {
    console.error(error);
    return { error: 'Database Error: Failed to get active jobs.' };
  }
}

/**
 * GET a job owners past jobs - meaning either
 * COMPLETE
 * CANCELLED
 * ACTIVE but the job start date is in the past
 */
export async function getAllPastJobsJobs(jobStatusList: string[]): Promise<TJob[] | {error:string}> {
  const session = await auth();
  const userId = session?.activeUser?.id;
  const yesterday = dayjs().subtract(1, 'day').endOf('day').toDate();

  try {
    const sql = neon(process.env.DATABASE_URL!);

    return await sql`
      SELECT j.*,
      TO_CHAR(j.job_start, 'YYYY-MM-DD HH24:MI:SS') as "jobStart",
      COALESCE(NULLIF(jsonb_agg(
        CASE WHEN cr.name IS NOT NULL THEN
          jsonb_build_object(
            'id', cr.id,
            'name', cr.name,
            'description', cr.description
          )
        END
      ), '[null]'), '[]'::jsonb) AS "crewRoles"
      FROM job j
      LEFT JOIN job_crew_role_join jcrj ON j.id = jcrj.job_id
      LEFT JOIN crew_roles cr ON jcrj.crew_role_id = cr.id
      WHERE owner_id = ${userId}
      AND (
        (status = ANY(${jobStatusList}))
        OR
        (status = 'ACTIVE'::job_status AND j.job_start <= ${yesterday})
      )
      GROUP BY j.id
      ORDER BY created_at DESC;` as TJob[];

  } catch (error) {
    console.error(error);
    return { error: 'Database Error: Failed to get past jobs.' };
  }
}
