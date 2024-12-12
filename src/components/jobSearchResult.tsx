import { Job } from "@/types/Job";
import JobTypeIcon from "./jobTypeIcon";
import IconButton from "./iconButton";
import Link from "next/link";

interface IJobSearchResultProps {
  jobData: Job;
}

export default function JobSearchResult({ jobData }: IJobSearchResultProps) {
  return (
    <Link className="w-full lg:w-1/2 h-24 lg:h-32" href={`job-list/job/${jobData.id}`}>
      <div className="flex flex-row bg-gray-300 hover:bg-gray-200 rounded-lg border border-dark-blue p-2 m-2 h-22 lg:h-28">
        <JobTypeIcon jobType={jobData.jobType}/>

        <div className="flex flex-col flex-1 pl-2">
          <h2 className="text-lg text-dark-blue font-semibold">{jobData.title}</h2>
          <h3 className="text-sm text-gray-600 font-semibold font-italic">{jobData.owner.moniker}</h3>
          <p className="text-sm text-gray-600">{jobData.amountPaid} aUEC / {jobData.payType}</p>
        </div>

        <div className="flex flex-col">
          <IconButton
            type={"bookmark"}
            selected={jobData.isBookmarked}
            onClickFn={() => {}}
          />
          <IconButton
            type={"flag"}
            selected={jobData.isFlagged}
            onClickFn={() => {}}
          />
        </div>
      </div>
    </Link>
  )
}
