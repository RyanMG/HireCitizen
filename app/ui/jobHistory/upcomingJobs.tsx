import { getUserJobApplications } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { Person } from "@/app/lib/definitions/person";
import NoResultsBlock from "../jobCommon/noResultsBlock";
import JobApplicationDetailsBlock from "./jobApplicationDetailsBlock";

export default async function UpcomingJobs() {
  const session = await auth();
  const user = session?.activeUser as Person;
  const upcomingJobs = await getUserJobApplications(user, ['ACCEPTED']);

  if ('error' in upcomingJobs) {
    return <div>{upcomingJobs.error}</div>;
  }

  return (
    <div>
      {upcomingJobs.length === 0 && <NoResultsBlock text="No scheduled jobs. Get out there and apply!" />}
      {upcomingJobs.map((acceptedApplication) => (
        <JobApplicationDetailsBlock key={acceptedApplication.id} application={acceptedApplication} />
      ))}
    </div>
  );
}
