import { getUserJobApplications } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { TPerson } from "@definitions/person";
import NoResultsBlock from "@components/noResultsBlock";
import JobApplicationDetailsBlock from "@ui/employeePages/jobApplicationDetailsBlock";

export default async function UpcomingJobs() {
  const session = await auth();
  const user = session?.activeUser as TPerson;
  const upcomingJobs = await getUserJobApplications(user, ['ACCEPTED']);

  if ('error' in upcomingJobs) {
    return <div>{upcomingJobs.error}</div>;
  }

  return (
    <div className="min-h-28">
      {upcomingJobs.length === 0 && <NoResultsBlock text="No scheduled jobs. Get out there and apply!" />}
      {upcomingJobs.map((acceptedApplication) => (
        <JobApplicationDetailsBlock key={acceptedApplication.id} application={acceptedApplication} />
      ))}
    </div>
  );
}
