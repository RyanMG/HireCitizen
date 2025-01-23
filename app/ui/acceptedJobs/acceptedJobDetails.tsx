import { getJobDateFormatted, getEstimatedTime } from "@/app/lib/utils/dateUtils";
import { Job } from "@definitions/job";
import Link from "next/link";

export default function AcceptedJobDetails({ job }: { job: Job }) {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-gray-400 text-md font-semibold">Job Owner:</h2>
        <Link href={`/profile/${job?.owner?.id}?back=work-history/accepted-jobs/${job?.id}`} className="text-light-blue">
          <p className="text-md font-semibold">{job?.owner?.moniker}</p>
        </Link>
      </div>
      <p className="text-gray-200 text-md italic">{job?.description}</p>

      <div className="flex flex-row items-center gap-2">
        <h2 className="text-gray-400 text-md font-semibold">Job Starts:</h2>
        <p className="text-gray-200 text-md font-semibold">{getJobDateFormatted(job?.jobStart)}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-gray-400 text-md font-semibold">Job is estimated to take:</h2>
        <p className="text-gray-200 text-md font-semibold">{getEstimatedTime(job?.estimatedTime)}</p>
      </div>

    </div>
  );
}