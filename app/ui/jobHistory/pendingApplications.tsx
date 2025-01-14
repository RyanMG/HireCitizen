import { JobApplicant } from "@/app/lib/definitions/job";
import { getUserJobApplications } from "@/app/lib/query/jobRoles/data";
import { auth } from '@/auth';
import { Person } from "@definitions/person";
import clsx from "clsx";
import Link from "next/link";
import NoResultsBlock from "../jobCommon/noResultsBlock";

const ApplicationItem = ({ application }: { application: JobApplicant }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-gray-400 px-4 py-2 rounded-md">
      <div className="flex flex-col">
        <h2 className="text-md font-bold text-gray-900">{application.job?.title}</h2>
        <Link href={`/profile/${application.job?.owner?.id}?back=work-history`}>
          <p className="text-sm text-blue">Job Owner: <span className="font-bold">{application.job?.owner?.handle}</span></p>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm text-gray-800">Application Status:</p>
        <span className={clsx("text-sm font-bold",
        {
          'text-blue': application.acceptedStatus === 'PENDING',
          'text-red-900': application.acceptedStatus === 'REJECTED',
        }
      )}>
          {application.acceptedStatus}
        </span>
      </div>
    </div>
  );
};

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
        <ApplicationItem key={application.id} application={application} />
      ))}
    </div>
  );
}
