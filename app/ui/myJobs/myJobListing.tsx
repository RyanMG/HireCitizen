import { getMyJobs } from "@/app/lib/query/job/data";
import ActiveJobCard from "./activeJobCard";
import DataFetchErrorSnack from "../components/dataFetchErrorSnack";

/*
 * No jobs found block
 */
const NoJobsFound = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col pt-10 items-center justify-center flex-1">
      <p className="border border-white rounded-md p-4 text-white">{text}</p>
    </div>
  );
}

/*
 * Section header for a job status section
 */
const SectionHeader = ({ title }: { title: string }) => {
  return <h2 className="text-xl text-gray-500 font-bold border-b border-gray-500 pb-2">{title}</h2>;
}

export default async function MyJobListing({
  jobStatusList
}: {
  jobStatusList: string[]
}) {
  if (!jobStatusList || jobStatusList.length === 0) {
    return <NoJobsFound text="Select a job status to view jobs" />;
  }

  const jobs = await getMyJobs(jobStatusList);

  if ('error' in jobs) {
    const messages: string[] = ['error' in jobs ? jobs.error : ''].filter(Boolean) as string[];
    return <DataFetchErrorSnack messages={messages} />
  }

  if (jobs.length === 0) {
    return <NoJobsFound text="No jobs found" />;
  }

  const jobDisplay = jobs.reduce((acc, job) => {
    const status = job.status?.toLowerCase() || '';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(<ActiveJobCard job={job} key={job.id} />);
    return acc;
  }, {} as { [key: string]: React.ReactNode[] });

  return (
    <>
      {jobDisplay.pending && jobDisplay.pending.length > 0 &&
        <div>
          <SectionHeader title="Pending" />
          {jobDisplay.pending}
        </div>
      }
      {jobDisplay.active && jobDisplay.active.length > 0 &&
        <div>
          <SectionHeader title="Active" />
          {jobDisplay.active}
        </div>
      }
      {jobDisplay.finished && jobDisplay.finished.length > 0 &&
        <div>
          <SectionHeader title="Finished" />
          {jobDisplay.finished}
        </div>
      }
      {jobDisplay.cancelled && jobDisplay.cancelled.length > 0 &&
        <div>
          <SectionHeader title="Cancelled" />
          {jobDisplay.cancelled}
        </div>
      }
    </>
  )
}
