'use server';

import IconButton from "@ui/components/iconBtns/iconBtn";
import Link from "next/link";
import { getJobDateFormatted, getEstimatedTime } from "@/app/lib/utils/dateUtils";
import { TJob } from "@definitions/job";

export default async function JobDetails({ job }: { job: TJob }) {

  return (
    <div className="flex flex-col bg-dark-blue border border-gray-400 rounded-sm mb-4 p-4">
      <div className="flex flex-row justify-between bg-blue border border-gray-700 rounded-md px-2 py-1 mb-2">
        <h1 className="flex items-center text-white text-2xl font-bold pl-1">{job.title}</h1>
        <div className="flex flex-row">
          <IconButton
            type={"bookmark"}
            selected={job.isBookmarked || false}
            jobId={job.id}
          />
          <IconButton
            type={"flag"}
            selected={job.isFlagged || false}
            jobId={job.id}
          />
        </div>
      </div>

      <Link href={`/profile/${job.owner.id}?back=job-search/job/${job.id}`} className="py-2">
        <p className="text-gray-400 text-sm italic">Job Owner</p>
        <p className="text-light-blue text-lg font-bold not-italic">{job.owner.moniker}</p>
      </Link>

      <div className="flex flex-col">
        <p className="text-gray-400 text-sm italic">Description</p>
        <p className="text-white text-lg">{job.description}</p>
      </div>

      <div className="flex flex-row justify-between py-2">
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Job Start Date</p>
          <p className="text-white text-lg">{getJobDateFormatted(job.jobStart)}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Estimated Time to Complete</p>
          <p className="text-white text-lg">{getEstimatedTime(job.estimatedTime)} </p>
        </div>
      </div>
    </div>
  )
}
