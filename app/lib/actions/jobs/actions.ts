'use server';

import { neon } from "@neondatabase/serverless";
import { z } from 'zod';
import { redirect } from 'next/navigation';
import {auth} from 'auth';

const CreateJobFormSchema = z.object({
  id: z.string(),
  owner_id: z.number(),
  language_id: z.number(),
  jobTitle: z.string().trim().min(5, {
    message: 'Please provide a valid job title.',
  }),
  jobType: z.number({
    invalid_type_error: 'Please select a valid job type.',
  }),
  jobDescription: z.string().trim().min(10, {
    message: 'Please provide a valid job description.',
  }),
  jobStatus: z.enum(['PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED']),
  jobDate: z.string().date(),
  jobTimezone: z.coerce.number(),
  jobEstimatedTime: z.coerce
    .number()
    .int({ message: 'Please enter a valid number.' }),
  jobPayout: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
  jobPayedVia: z.enum(['SPLIT', 'PERSON', 'TOTAL'], {
    message: 'Please select a valid option.',
  }),
  jobPrivacy: z.enum(['PUBLIC', 'FRIENDS', 'ORG'], {
    invalid_type_error: 'Please select a valid option.',
  }),
  jobReputationGate: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

const CreateNewJob = CreateJobFormSchema.omit({ id: true, owner_id: true, jobStatus: true,language_id: true, createdAt: true, updatedAt: true });

export type State = {
  errors?: {
    jobTitle?: string,
    jobType?: string,
    jobDescription?: string,
    jobDate?: string,
    jobTimezone?: string,
    jobEstimatedTime?: string,
    jobPayout?: string,
    jobPayedVia?: string,
    jobPrivacy?: string,
    jobReputationGate?: string,
  };
  message?: string | null;
  prevState?: {
    jobTitle?: string,
    jobType?: string,
    jobDescription?: string,
    jobDate?: string,
    jobTimezone?: string,
    jobEstimatedTime?: string,
    jobPayout?: string,
    jobPayedVia?: string,
    jobPrivacy?: string,
    jobReputationGate?: boolean,
  };
};

/**
 * Create an new job
 */
export async function createNewJob(prevState: State, formData: FormData) {
  console.log('jobDate',formData.get('jobDate'));
  console.log('jobTimezone',formData.get('jobTimezone'));
  console.log('jobPayedVia',formData.get('jobPayedVia'));

  const validatedFields = CreateNewJob.safeParse({
    jobTitle: formData.get('jobTitle'),
    jobType: formData.get('jobType'),
    jobDescription: formData.get('jobDescription'),
    jobDate: formData.get('jobDate'),
    jobTimezone: formData.get('jobTimezone'),
    jobEstimatedTime: formData.get('jobEstimatedTime'),
    jobPayout: formData.get('jobPayout'),
    jobPayedVia: formData.get('jobPayedVia'),
    jobPrivacy: formData.get('jobPrivacy'),
    jobReputationGate: formData.get('jobReputationGate')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create New Job.',
      prevState: {
        jobTitle: formData.get('jobTitle'),
        jobType: formData.get('jobType'),
        jobDescription: formData.get('jobDescription'),
        jobDate: formData.get('jobDate'),
        jobTimezone: formData.get('jobTimezone'),
        jobEstimatedTime: formData.get('jobEstimatedTime'),
        jobPayout: formData.get('jobPayout'),
        jobPayedVia: formData.get('jobPayedVia'),
        jobPrivacy: formData.get('jobPrivacy'),
        jobReputationGate: formData.get('jobReputationGate')
      }
    }
  }
  const session = await auth()
  let owner_id, language_id;
  if (session?.user) {
    owner_id = session.user.id;
    language_id = 1; //session.user.language;
  }
  const { jobTitle, jobType, jobDescription, jobDate, jobTimezone, jobEstimatedTime, jobPayout, jobPayedVia, jobPrivacy, jobReputationGate } = validatedFields.data;
  const dateNow = new Date().toISOString().split('T')[0];
  const status = 'PENDING'; // @TODO compare to current date

  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO invoices (owner_id, language_id, title, job_type_id, description, status, job_start, jobTimezone, estimated_time, amount_paid, pay_type, job_privacy reputation_gate, created_at, updated_at)
      VALUES (
        ${owner_id},
        ${language_id},
        ${jobTitle},
        ${jobType},
        ${jobDescription},
        ${status},
        ${jobDate},
        ${jobTimezone},
        ${jobEstimatedTime},
        ${jobPayout},
        ${jobPayedVia},
        ${jobPrivacy},
        ${jobReputationGate},
        ${dateNow},
        ${dateNow}
      )
    `;

  } catch {
    return { message: 'Database Error: Failed to Create New Job.' };
  }

  redirect('/');
}
