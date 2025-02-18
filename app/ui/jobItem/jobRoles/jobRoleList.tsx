'use client';

import { TJob, TJobApplicant } from "@definitions/job";
import JobRoleListing from "./jobRoleListing";
import SectionHeader from "@components/sectionHeader";
import { useCallback, useEffect, useState } from "react";
import { getJobApplicationStatus } from "@query/jobRoles/data";
import { TPerson } from "@definitions/person";

interface CrewRoleListProps {
  job: TJob,
  user: TPerson
}

export default function CrewRoleList({
  job,
  user
}: CrewRoleListProps) {
  const [application, setApplication] = useState<TJobApplicant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetApplication = (user: TPerson, jobId: string) => {
    getJobApplicationStatus(jobId, user)
      .then((updatedApplication) => {
        if (updatedApplication && 'error' in updatedApplication) {
          setError(updatedApplication.error);
          return;
        }

        setApplication(updatedApplication);
      });
  }

  const updateApplication = useCallback((isApplied: boolean) => {
    if (isApplied) {
      fetchAndSetApplication(user, job.id);
    } else {
      setApplication(null);
    }
    setError(null);
  }, [setApplication, job.id, user]);

  // Initial fetch of application state
  useEffect(() => {
    fetchAndSetApplication(user, job.id);
  }, [user, job.id]);

  return (
    <>
      <SectionHeader title="Job Roles Available" />
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        {job.crewRoles?.map(role => {
          return (
            <JobRoleListing
              role={role}
              job={job}
              key={role.id}
              currentApplication={application}
              updateApplication={updateApplication}
              user={user}
            />
          )
})}
      </div>
    </>
  )
}
