'use server';

import { getJobById } from "@/app/lib/query/job/data";
import NotificationSnackbar from "../components/notificationSnackbar";
import { TJob } from "@/app/lib/definitions/job";
import JobDetails from "./jobDetailsBlock";
import JobRoleList from "./jobRoles/jobRoleList";
import { auth } from "@/auth";

export default async function JobOverviewWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const job: TJob | { error: string } = await getJobById(jobId);
  const session = await auth();

  if ('error' in job) {
    return (
      <NotificationSnackbar
        type="error"
        messages={[job.error]}
        redirectTo={`/`}
      />
    )
  }

  return (
    <>
      <JobDetails job={job} backPath={`job-search/job/${job.id}`} />
      <div className="flex flex-col overflow-auto">
        {session?.activeUser && (
          <JobRoleList job={job} user={session?.activeUser} />
        )}
      </div>
    </>
  );
}