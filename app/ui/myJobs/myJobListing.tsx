import { getActiveJobs } from "@/app/lib/query/job/data";
import ActiveJobCard from "./activeJobCard";

const NoJobsFound = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col pt-10 items-center justify-center flex-1">
      <p className="border border-white rounded-md p-4 text-white">{text}</p>
    </div>
  );
}

export default async function MyJobListing({
  jobStatusList
}: {
  jobStatusList: string[]
}) {
  if (!jobStatusList || jobStatusList.length === 0) {
    return <NoJobsFound text="Select a job status to view jobs" />;
  }

  const jobs = await getActiveJobs(jobStatusList);

  if ('error' in jobs) {
    return <div>{jobs.error}</div>;
  }

  if (jobs.length === 0) {
    return <NoJobsFound text="No jobs found" />;
  }

  return (
    <>
      {jobs.map(job => <ActiveJobCard job={job} key={job.id} />)}
    </>
  )
}
