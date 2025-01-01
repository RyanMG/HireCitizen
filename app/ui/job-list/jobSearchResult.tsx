import { Job } from "@definitions/job";
import JobTypeIcon from "@ui/job-list/jobTypeIcon";
import IconButton from "@ui/components/iconBtns/iconBtn";
import Link from "next/link";

interface IJobSearchResultProps {
  jobData: Job;
}

export default function JobSearchResult({ jobData }: IJobSearchResultProps) {
  return (
    <Link className="w-full lg:w-1/2 h-24 lg:h-32"
      href={`/job-list/job/${jobData.id}`}
      prefetch={false}
    >
      <div className="flex flex-row bg-gray-300 hover:bg-gray-200 rounded-lg border border-dark-blue p-2 m-2 h-22 lg:h-28">
        <JobTypeIcon jobType={jobData.jobType}/>

        <div className="flex flex-col flex-1 pl-2">
          <h2 className="text-lg text-dark-blue font-semibold">{jobData.title}</h2>
          <h3 className="text-sm text-gray-600 font-semibold font-italic">{jobData.owner.moniker}</h3>
          {jobData.createdAt && <p className="text-sm text-gray-600">Job created: {new Date(jobData.createdAt).toLocaleDateString()}</p>}
        </div>

        <div className="flex flex-col">
          <IconButton
            type={"bookmark"}
            selected={jobData.isBookmarked || false}
            jobId={jobData.id}
          />
          <IconButton
            type={"flag"}
            selected={jobData.isFlagged || false}
            jobId={jobData.id}
          />
        </div>
      </div>
    </Link>
  )
}
