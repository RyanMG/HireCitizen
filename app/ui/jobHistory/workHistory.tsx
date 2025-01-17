import { getUserPastJobs } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { Person } from "@/app/lib/definitions/person";
import NoResultsBlock from "../jobCommon/noResultsBlock";
import JobApplicationDetailsBlock from "./jobApplicationDetailsBlock";

export default async function WorkHistory() {
  const session = await auth();
  const user = session?.activeUser as Person;
  const pastJobs = await getUserPastJobs(user);

  if ('error' in pastJobs) {
    return <div>{pastJobs.error}</div>;
  }

  return (
    <div>
      {pastJobs.length === 0 && <NoResultsBlock text="No past jobs found." />}
      {pastJobs.map((acceptedApplication) => (
        <JobApplicationDetailsBlock key={acceptedApplication.id} application={acceptedApplication} />
      ))}
    </div>
  );
}
