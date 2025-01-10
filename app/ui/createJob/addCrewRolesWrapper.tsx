'use server';

import { Job } from "@/app/lib/definitions/job";
import { getJobById } from "@/app/lib/query/job/data";
import JobCrewRoleList from "../jobCommon/jobCrewRoleList";
import { redirect } from "next/navigation";

interface AddCrewRolesWrapperProps {
  id: string;
}

export default async function AddCrewRolesWrapper({
  id
}: AddCrewRolesWrapperProps) {

  const job: Job | { error: string } = await getJobById(id);

  if ('error' in job) {
    // @TODO snackbar error message
    redirect('/');
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
