'use client';

import { Job, JobApplicant } from "@definitions/job";
import CrewRoleListing from "./crewRoleListing";
import { useEffect, useState } from "react";
import { getJobApplicationStatus } from "@/app/lib/query/jobRoles/data";

export default function CrewRoleList(props: {
  job: Job,
  applications: JobApplicant[] | null,
  userId: string
}) {
  const {
    job,
    applications: initialApplications,
    userId
  } = props;

  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [applications, setApplications] = useState<JobApplicant[]>(initialApplications || []);

  useEffect(() => {
    if (hasApplied) {
      getJobApplicationStatus(job.id, userId).then((updatedApplications) => {
        setApplications(updatedApplications || []);
      });
    }
  }, [hasApplied, job.id, userId]);

  if (!userId) {
    return null;
  }

  return (
    <>
      <h2 className="text-gray-400 text-lg font-bold mt-4 border-t border-gray-700 pt-4">Job Roles Available</h2>
      <div className="flex flex-col pt-4">
        {job.crewRoles?.map(role => (
          <CrewRoleListing role={role} jobId={job.id} applications={applications} key={role.id} setHasApplied={setHasApplied} />
        ))}
      </div>
    </>
  )
}
