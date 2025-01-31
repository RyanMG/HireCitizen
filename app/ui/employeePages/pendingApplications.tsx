import { getUserJobApplications } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { Person } from "@/app/lib/definitions/person";
import NoResultsBlock from "@components/noResultsBlock";
import JobApplicationDetailsBlock from "@ui/employeePages/jobApplicationDetailsBlock";

export default async function PendingApplications() {
  const session = await auth();
  const user = session?.activeUser as Person;
  const pendingApplications = await getUserJobApplications(user, ['PENDING', 'REJECTED']);

  if ('error' in pendingApplications) {
    return <div>{pendingApplications.error}</div>;
  }

  return (
    <div className="min-h-28">
      {pendingApplications.length === 0 && <NoResultsBlock text="No applications currently pending." />}
      {pendingApplications.map((application) => (
        <JobApplicationDetailsBlock key={application.id} application={application} />
      ))}
    </div>
  );
}
