'use server';

import { TJob } from "@definitions/job";
import { getJobById } from "@/app/lib/query/job/data";
import JobCrewRoleList from "@ui/employerPages/addCrewRoles/jobCrewRoleList";
import NotificationSnackbar from "@ui/components/notificationSnackbar";
import { auth } from "@/auth";
import { TPerson } from "@definitions/person";

interface AddCrewRolesWrapperProps {
  id: string;
}

export default async function AddCrewRolesWrapper({
  id
}: AddCrewRolesWrapperProps) {
  const session = await auth();
  const user = session?.activeUser as TPerson;

  const job: TJob | { error: string } = await getJobById(id);

  if ('error' in job) {
    return (
      <NotificationSnackbar
        type="error"
        messages={[job.error]}
        redirectTo="/"
      />
    )
  }

  if (job.owner.id !== user.id) {
      return (
      <NotificationSnackbar
        type="warning"
        messages={['You are not authorized to view this job.']}
        redirectTo="/"
      />
    )
  }

  return (
    <div className="bg-gray-300 p-4 rounded-lg">
      <JobCrewRoleList
        jobId={id}
        crewRoles={job.crewRoles}
        currentJobType={job.jobType}
      />
    </div>
  );
}
