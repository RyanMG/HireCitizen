'use server';

import { neon } from "@neondatabase/serverless";
import { auth } from 'auth';
import { revalidatePath } from "next/cache";

import {
  addUserNotification,
  deleteUserNotificationWithoutId
} from "@query/notifications/actions";
import { buildNotificationPayload } from "@utils/notifications";
import {
  TJobApplicant
} from "@definitions/job";
import {
  TApplicationsData
 } from "@definitions/notifications";
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

    const applicationID = await sql`INSERT INTO job_applicants (job_id, person_id, crew_role_id, accepted_status) VALUES (${jobId}, ${userId}, ${roleId}, 'PENDING') RETURNING id`;
    const jobOwnerId = await sql`SELECT owner_id FROM job WHERE id = ${jobId}`;

    const notificationPayload = buildNotificationPayload('employerApplicationsIncoming', {
      applicationId: applicationID[0].id,
      applicantId: userId,
      jobId: jobId
    } as TApplicationsData)!;

    const notificationUpdateResp = await addUserNotification({
      userId: jobOwnerId[0].owner_id,
      type: 'employerApplicationsIncoming',
      payload: notificationPayload
    });

    if ('error' in notificationUpdateResp || !notificationUpdateResp.success) {
      return {
        submitted: false,
        message: null,
        error: 'Failed to add notification.'
      };
    }

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
    const previousStatus = await sql`SELECT accepted_status as "acceptedStatus" FROM job_applicants WHERE job_id=${jobId} AND person_id=${userId} AND crew_role_id=${roleId}` as unknown as TJobApplicant[];
    const deletedApplicationId = await sql`DELETE FROM job_applicants WHERE job_id=${jobId} AND person_id=${userId} AND crew_role_id=${roleId} RETURNING id` as unknown as string[];

    if (previousStatus[0].acceptedStatus === 'ACCEPTED') {
      await sql`UPDATE job_crew_role_join SET crew_role_filled_count = crew_role_filled_count - 1 WHERE job_id = ${jobId} AND crew_role_id = ${roleId}`;
    }

    const jobOwnerId = await sql`SELECT owner_id FROM job WHERE id = ${jobId}` as unknown as string[];

    await deleteUserNotificationWithoutId('employerApplicationsIncoming', jobOwnerId[0], {
      applicationId: deletedApplicationId[0]
    });

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
export async function toggleApplicationStatus(applicationId: number, jobId: string, status: string): Promise<{submitted: boolean, message: string | null, error: string | null}> {

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const previousStatus = await sql`SELECT accepted_status as "acceptedStatus" FROM job_applicants WHERE id=${applicationId}` as unknown as TJobApplicant[];
    const statusChangeResponse = await sql`UPDATE job_applicants SET accepted_status=${status} WHERE id=${applicationId} RETURNING person_id, job_id, crew_role_id`;
    const roleCounts = await sql`SELECT crew_role_requested_count, crew_role_filled_count FROM job_crew_role_join WHERE job_id = ${jobId} AND crew_role_id = ${statusChangeResponse[0].crew_role_id}`;

    // If the user is accepted, notify them
    if (status === 'ACCEPTED') {
      if (previousStatus[0].acceptedStatus !== 'ACCEPTED') {
        await sql`UPDATE job_crew_role_join SET crew_role_filled_count = ${roleCounts[0].crew_role_filled_count + 1} WHERE job_id = ${jobId} AND crew_role_id = ${statusChangeResponse[0].crew_role_id}`;
      }

      const notificationPayload = buildNotificationPayload('employeeApplicationChanges', {
        applicationId: applicationId,
        applicantId: statusChangeResponse[0].person_id,
        jobId: statusChangeResponse[0].job_id
      } as TApplicationsData)!;

      const notificationUpdateResp = await addUserNotification({
        userId: statusChangeResponse[0].person_id,
        type: 'employeeApplicationChanges',
        payload: notificationPayload
      });

      if ('error' in notificationUpdateResp || !notificationUpdateResp.success) {
        return {
          submitted: false,
          message: null,
          error: 'Failed to add notification.'
        };
      }
    }

    // If the user is set to pending or rejected, ensure we clear out any existing notifications
    if (status === 'PENDING' || status === 'REJECTED') {
      if (previousStatus[0].acceptedStatus === 'ACCEPTED') {
        await sql`UPDATE job_crew_role_join SET crew_role_filled_count = ${roleCounts[0].crew_role_filled_count - 1} WHERE job_id = ${jobId} AND crew_role_id = ${statusChangeResponse[0].crew_role_id}`;
      }

      await deleteUserNotificationWithoutId('employeeApplicationChanges', statusChangeResponse[0].person_id, {
        jobId: statusChangeResponse[0].job_id
      });
    }

  } catch (error) {
    console.error(error);
    return {
      submitted: false,
      message: null,
      error: 'Database Error: Failed to update job application status.'
    };
  }

  revalidatePath(`/job/${jobId}`);

  return {
    submitted: true,
    message: 'Job application status updated.',
    error: null
  };
}

export async function removeCrewMember(jobId: string, roleId: number, crewMemberId: string): Promise<{submitted: boolean, message: string | null, error: string | null}> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`DELETE FROM job_applicants WHERE job_id=${jobId} AND person_id=${crewMemberId} AND crew_role_id=${roleId} RETURNING id` as unknown as string[];
    await sql`UPDATE job_crew_role_join SET crew_role_filled_count = crew_role_filled_count - 1 WHERE job_id = ${jobId} AND crew_role_id = ${roleId}`;

  } catch (error) {
    console.error(error);
    return {
      submitted: false,
      message: null,
      error: 'Database Error: Failed to remove accepted crew member.'
    };
  }

  revalidatePath(`/job/${jobId}`);

  return {
    submitted: true,
    message: 'Crew member removed.',
    error: null
  };
}
