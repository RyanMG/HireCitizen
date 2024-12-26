'use server';

import { neon } from "@neondatabase/serverless";
import { Job, JobType } from "@definitions/job";
import { Person, PersonLanguage } from "../../definitions/person";

const JOB_SEARCH_RESULTS_PER_PAGE = 10;

export async function fetchDefaultJobsPaginated() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM job` as Job[];

    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function searchJobsPaginated(searchTerm: string = "", currentPage: number = 1) {
  const sql = neon(process.env.DATABASE_URL!);
  const pageOffset = (currentPage - 1) * JOB_SEARCH_RESULTS_PER_PAGE;
  const queryLike = `%${searchTerm}%`;

  const data = await sql`
    SELECT j.*,
    p.id AS person_id, p.moniker,
    jt.id as jobtype_id, jt.name AS job_type_name, jt.description AS job_type_description,
    l.code AS language_code, l.name AS language_name
    FROM job j
    LEFT JOIN person p ON j.owner_id = p.id
    LEFT JOIN job_type jt ON j.job_type_id = jt.id
    LEFT JOIN language l ON j.language_id = l.id
    WHERE j.title ILIKE ${queryLike}
    ORDER BY j.created_at DESC
    LIMIT ${JOB_SEARCH_RESULTS_PER_PAGE} OFFSET ${pageOffset};`

    const jobs = data.map<Job>(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      jobStart: row.job_start,
      estimatedTime: row.estimated_time,
      amountPaid: row.amount_paid,
      payType: row.pay_type,
      isBookmarked: row.is_bookmarked,
      isFlagged: row.is_flagged,
      crewRoles: row.crew_roles || [],
      owner: {
        id: row.user_id,
        moniker: row.moniker
      } as Person,
      jobType: {
        id: row.jobtype_id,
        name: row.job_type_name,
        description: row.job_type_description
      } as JobType,
      language: {
        code: row.language_code,
        name: row.language_name
      } as PersonLanguage
    }));

  return jobs;
}
