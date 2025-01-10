'use client';

import { Job, JobApplicant } from "@definitions/job";
import CrewRoleListing from "./crewRoleListing";
import { useCallback, useState } from "react";
import { getJobApplicationStatus } from "@/app/lib/query/jobRoles/data";

interface CrewRoleListProps {
  job: Job,
  application: JobApplicant | null,
  userId: string
}

export default function CrewRoleList({
  job,
  application: initialApplication,
  userId
}: CrewRoleListProps) {
  const [application, setApplication] = useState<JobApplicant | null>(initialApplication);

  const updateApplication = useCallback((isApplied: boolean) => {
    if (isApplied) {
      getJobApplicationStatus(job.id, userId).then((updatedApplication) => {
        setApplication(updatedApplication);
      });

    } else {
      setApplication(null);
    }
  }, [setApplication, job.id, userId]);

  if (!userId) {
    return null;
  }

  return (
    <>
      <h2 className="text-gray-400 text-lg font-bold mt-4 border-t border-gray-700 pt-4">Job Roles Available</h2>
      <div className="flex flex-col pt-4">
        {job.crewRoles?.map(role => (
          <CrewRoleListing
            role={role}
            jobId={job.id}
            key={role.id}
            currentApplication={application}
            updateApplication={updateApplication}
          />
        ))}
      </div>
    </>
  )
}
