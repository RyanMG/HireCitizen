'use server';

import { neon } from "@neondatabase/serverless";
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { auth } from 'auth';
import { revalidatePath } from "next/cache";

const CreateJobFormSchema = z.object({
  id: z.string(),
  owner_id: z.number(),
  language_id: z.number(),
  jobTitle: z.string().trim().min(5, {
    message: 'Please provide a valid job title.',
  }),
  jobType: z.coerce
    .number()
    .gt(0, { message: 'Please select a valid job type.' }
  ),
  jobDescription: z.string().trim().min(10, {
    message: 'Please provide a valid job description.',
  }),
  jobStatus: z.enum(['PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED']),
  jobDate: z.string().datetime({
    message: 'Please provide a valid job date.',
  }),
  jobEstimatedTime: z.coerce
    .number()
    .gt(0, { message: 'Please enter a valid number.' }),
  jobPrivacy: z.enum(['PUBLIC', 'FRIENDS', 'ORG'], {
    invalid_type_error: 'Please select a valid option.',
  }),
  jobReputationGate: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type CreateJobFormState = {
  errors?: {
    jobTitle?: string[],
    jobType?: string[],
    jobDescription?: string[],
    jobDate?: string[],
    jobEstimatedTime?: string[],
    jobPrivacy?: string[],
    jobReputationGate?: string[]
  };
  saveResponse?: string | null;
  prevState?: {
    jobTitle?: string,
    jobType?: string,
    jobDescription?: string,
    jobDate?: string,
    jobEstimatedTime?: string,
    jobPrivacy?: string,
    jobReputationGate?: boolean,
  };
};

/**
 * Create an new job
 */
export async function createNewJob(prevState: CreateJobFormState | null, formData: FormData) {
  const CreateNewJob = CreateJobFormSchema.omit({ id: true, owner_id: true, jobStatus: true,language_id: true, createdAt: true, updatedAt: true });
  const jobDateFormatted = new Date(formData.get('jobDate') as string);

  const validatedFields = CreateNewJob.safeParse({
    jobTitle: formData.get('jobTitle'),
    jobType: formData.get('jobType'),
    jobDescription: formData.get('jobDescription'),
    jobDate: jobDateFormatted.toISOString(),
    jobEstimatedTime: formData.get('jobEstimatedTime'),
    jobPrivacy: formData.get('jobPrivacy'),
    jobReputationGate: Boolean(formData.get('jobReputationGate'))
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create new job.',
      prevState: {
        jobTitle: formData.get('jobTitle'),
        jobType: formData.get('jobType'),
        jobDescription: formData.get('jobDescription'),
        jobDate: formData.get('jobDate'),
        jobEstimatedTime: formData.get('jobEstimatedTime'),
        jobPrivacy: formData.get('jobPrivacy'),
        jobReputationGate: Boolean(formData.get('jobReputationGate'))
      }
    } as unknown as CreateJobFormState;
  }
  const session = await auth()
  let owner_id, language_id;

  if (session?.activeUser) {
    owner_id = session.activeUser.id;
    language_id = session.activeUser.language.id;
  }

  const { jobTitle, jobType, jobDescription, jobDate, jobEstimatedTime, jobPrivacy, jobReputationGate } = validatedFields.data;
  const dateNow = new Date().toISOString();
  const status = 'PENDING';

  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO job (owner_id, language_id, title, job_type_id, description, status, job_start, estimated_time, job_privacy, reputation_gate, created_at, updated_at)
      VALUES (
        ${owner_id},
        ${language_id},
        ${jobTitle},
        ${jobType},
        ${jobDescription},
        ${status},
        ${jobDate},
        ${jobEstimatedTime},
        ${jobPrivacy},
        ${jobReputationGate},
        ${dateNow},
        ${dateNow}
      )
    `;

  } catch (error) {
    console.error(error);
    return { saveResponse: 'Database Error: Failed to Create New Job.' };
  }

  revalidatePath('/my-jobs');
  redirect('/my-jobs');
}

/**
 * Edit a job
 */
export async function editJob(jobId: string, prevState: CreateJobFormState | null, formData: FormData) {
  const EditJob = CreateJobFormSchema.omit({ id: true, owner_id: true, jobStatus: true, language_id: true, createdAt: true, updatedAt: true });
  const jobDateFormatted = new Date(formData.get('jobDate') as string);

  const validatedFields = EditJob.safeParse({
    jobTitle: formData.get('jobTitle'),
    jobType: formData.get('jobType'),
    jobDescription: formData.get('jobDescription'),
    jobDate: jobDateFormatted.toISOString(),
    jobEstimatedTime: formData.get('jobEstimatedTime'),
    jobPrivacy: formData.get('jobPrivacy'),
    jobReputationGate: Boolean(formData.get('jobReputationGate'))
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update job.',
      prevState: {
        jobTitle: formData.get('jobTitle'),
        jobType: formData.get('jobType'),
        jobDescription: formData.get('jobDescription'),
        jobDate: formData.get('jobDate'),
        jobEstimatedTime: formData.get('jobEstimatedTime'),
        jobPrivacy: formData.get('jobPrivacy'),
        jobReputationGate: Boolean(formData.get('jobReputationGate'))
      }
    } as unknown as CreateJobFormState;
  }

  const { jobTitle, jobType, jobDescription, jobDate, jobEstimatedTime, jobPrivacy, jobReputationGate } = validatedFields.data;

  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      UPDATE job
      SET
        title = ${jobTitle},
        job_type_id = ${jobType},
        description = ${jobDescription},
        job_start = ${jobDate},
        estimated_time = ${jobEstimatedTime},
        job_privacy = ${jobPrivacy},
        reputation_gate = ${jobReputationGate},
        updated_at = ${new Date().toISOString()}
      WHERE id = ${jobId}
    `;

  } catch (error) {
    console.error(error);
    return { saveResponse: 'Database Error: Failed to update job.' };
  }

  revalidatePath('/my-jobs');
  redirect('/my-jobs');
}

/**
 * Delete a job
 */
export async function deleteJob(jobId: string): Promise<{message: string|null} | {error: string|null}> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM job WHERE id = ${jobId}`;

  } catch (error) {
    console.error(error);
    return { error: 'Database Error: Failed to delete job.' };
  }

  revalidatePath('/my-jobs');
  return { message: 'Job deleted.' };
}
/**
 * Toggle a job flag
 */
export async function toggleJobFlag(jobId: string, selected: boolean): Promise<{message: string} | {error: string}> {
  const session = await auth()
  const userId = session?.user?.id;

  if (!userId) {
    return { error: 'No user logged in.' };
  }
  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (selected) {
      await sql`INSERT INTO job_flag (job_id, person_id) VALUES (${jobId}, ${userId}) ON CONFLICT DO NOTHING`;
    } else {
      await sql`DELETE FROM job_flag WHERE job_id = ${jobId} AND person_id = ${userId}`;
    }
    return {
      message: 'Job flagged.'
    }

  } catch {
    return { error: 'Database Error: Failed to add job flag.' };
  }
}
/**
 * Toggle a job bookmark
 */
export async function toggleJobBookmark(jobId: string, selected: boolean): Promise<{message: string} | {error: string}> {
  const session = await auth()
  const userId = session?.user?.id;

  if (!userId) {
    return { error: 'No user logged in.' };
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (selected) {
      await sql`INSERT INTO job_bookmark (job_id, person_id) VALUES (${jobId}, ${userId}) ON CONFLICT DO NOTHING`;
    } else {
      await sql`DELETE FROM job_bookmark WHERE job_id = ${jobId} AND person_id = ${userId}`;
    }
    return {
      message: 'Job bookmarked.'
    }
  } catch {
    return { error: 'Database Error: Failed to add job bookmark.' };
  }
}
