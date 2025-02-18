'use client';

import JobRoleApplicationBtn from './jobRoleApplicationBtn';
import { TCrewRole, TJob, TJobApplicant } from "@definitions/job";
import { TPerson } from "@definitions/person";

export default function JobRoleListing(props: {
  role: TCrewRole,
  job: TJob,
  currentApplication?: TJobApplicant | null,
  updateApplication?: (isApplied: boolean) => void
  user: TPerson
}) {

  const {
    role,
    job,
    currentApplication,
    updateApplication,
    user
  } = props;

  return (
    <article className="flex flex-row justify-between mb-1 items-center border-b border-gray-800 py-2">
      <p className="text-white">{role.name} <span className="text-gray-400 text-sm pl-2">({role.requestedCount - role.filledCount} {role.requestedCount - role.filledCount === 1 ? 'spot' : 'spots'})</span></p>
      {job.owner.id !== user.id &&
        <JobRoleApplicationBtn role={role} jobId={job.id} currentApplication={currentApplication!} updateApplication={updateApplication!}/>
      }
    </article>
  )
}
