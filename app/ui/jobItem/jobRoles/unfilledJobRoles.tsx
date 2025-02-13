'use server';

import SectionHeader from "@components/sectionHeader";
import JobRoleListing from "@ui/jobItem/jobRoles/jobRoleListing";
import { TJob } from "@definitions/job";
import { auth } from "@/auth";
import { TPerson } from "@definitions/person";

export default async function UnfilledJobRoles({ job }: { job: TJob }) {
  const session = await auth();
  const user = session?.activeUser as TPerson;

  return (
    <div>
      <SectionHeader title="Unfilled Crew Roles" />
      {job.crewRoles?.map(role => (
          <JobRoleListing
            role={role}
            job={job}
            key={role.id}
            user={user}
          />
        ))}
    </div>
  );
}