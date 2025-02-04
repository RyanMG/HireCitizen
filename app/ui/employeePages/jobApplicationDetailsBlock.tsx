import { TJobApplicant } from "@definitions/job";
import clsx from "clsx";
import Link from "next/link";

export default function JobApplicationDetailsBlock({ application }: { application: TJobApplicant }) {
  return (
    <div className="flex flex-row justify-between items-center bg-gray-400 px-4 py-2 my-1 rounded-md">
      <div className="flex flex-col">
        <h2 className="text-md font-bold text-gray-900">{application.job?.title}</h2>
        <Link href={`/profile/${application.job?.owner?.id}?back=work-history`}>
          <p className="text-sm text-blue">Job Owner: <span className="font-bold">{application.job?.owner?.handle}</span></p>
        </Link>
      </div>

      <Link href={application.acceptedStatus === 'PENDING' || application.acceptedStatus === 'REJECTED' ? `/job-search/job/${application.job?.id}` : `/job/${application.job?.id}`} className="text-sm text-blue">
        View Job
      </Link>

      <div className="flex flex-row items-center gap-2">
        <p className="text-sm text-gray-800">Application Status:</p>
        <span className={clsx("text-sm font-bold",
        {
          'text-yellow-900': application.acceptedStatus === 'ACCEPTED',
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
