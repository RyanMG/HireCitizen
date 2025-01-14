import { getUserJobApplications } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { Person } from "@definitions/person";
import NoResultsBlock from "../jobCommon/noResultsBlock";
import JobApplicationDetailsBlock from "./jobApplicationDetailsBlock";

export default async function PendingApplications() {
  const session = await auth();
  const user = session?.activeUser as Person;
  const pendingApplications = await getUserJobApplications(user, ['PENDING', 'REJECTED']);

  if ('error' in pendingApplications) {
    return <div>{pendingApplications.error}</div>;
  }

  return (
    <div>
      {pendingApplications.length === 0 && <NoResultsBlock text="No applications currently pending." />}
      {pendingApplications.map((application) => (
        <JobApplicationDetailsBlock key={application.id} application={application} />
      ))}
    </div>
  );
}
