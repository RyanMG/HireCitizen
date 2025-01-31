import { getMyJobs } from "@query/job/data";
import SectionHeader from "@components/sectionHeader";
import ActiveJobCard from "./jobCard";
import NotificationSnackbar from "@components/notificationSnackbar";
import NoResultsBlock from "@components/noResultsBlock";

export default async function MyJobListing({
  jobStatusList
}: {
  jobStatusList: string[]
}) {
  if (!jobStatusList || jobStatusList.length === 0) {
    return <NoResultsBlock text="Select a job status to view jobs" />;
  }

  const jobs = await getMyJobs(jobStatusList);

  if ('error' in jobs) {
    const messages: string[] = ['error' in jobs ? jobs.error : ''].filter(Boolean) as string[];
    return <NotificationSnackbar
      type="error"
      messages={messages}
    />
  }

  if (jobs.length === 0) {
    return <NoResultsBlock text="No jobs found" />;
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
