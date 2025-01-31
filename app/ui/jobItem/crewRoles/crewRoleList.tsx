'use client';

import { Job, JobApplicant } from "@/app/lib/definitions/job";
import CrewRoleListing from "./crewRoleListing";
import { useCallback, useEffect, useState } from "react";
import { getJobApplicationStatus } from "@/app/lib/query/jobRoles/data";
import { Person } from "@/app/lib/definitions/person";

interface CrewRoleListProps {
  job: Job,
  user: Person
}

export default function CrewRoleList({
  job,
  user
}: CrewRoleListProps) {
  const [application, setApplication] = useState<JobApplicant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetApplication = (user: Person, jobId: string) => {
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
      <h2 className="text-gray-400 text-lg font-bold mt-4 border-t border-gray-700 pt-4">Job Roles Available</h2>
      {error && <div className="text-red-500">{error}</div>}
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
