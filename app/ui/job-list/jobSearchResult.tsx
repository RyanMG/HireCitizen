import { Job } from "@definitions/job";
import JobTypeIcon from "@ui/job-list/jobTypeIcon";
import Link from "next/link";

interface IJobSearchResultProps {
  jobData: Job;
}

export default function JobSearchResult({ jobData }: IJobSearchResultProps) {
  return (
    <Link className="flex w-full lg:w-1/2 lg:h-28"
      href={`/job-list/job/${jobData.id}`}
      prefetch={false}
    >
      <div className="flex flex-row bg-gray-300 hover:bg-gray-200 rounded-lg border border-dark-blue p-2 m-1 w-full">
        <JobTypeIcon jobType={jobData.jobType} size="small"/>

        <div className="flex flex-col flex-1 pl-2">
          <h2 className="text-lg text-dark-blue font-semibold">{jobData.title}</h2>
          <h3 className="text-sm text-gray-600 font-semibold font-italic">{jobData.owner.moniker}</h3>
        </div>
      </div>
    </Link>
  )
}
