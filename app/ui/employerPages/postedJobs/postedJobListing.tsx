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
      {jobStatusList.includes('PENDING') && (
        <div>
          <SectionHeader title="Pending" />
          {jobDisplay.pending && jobDisplay.pending.length > 0 && jobDisplay.pending}
          {(!jobDisplay.pending || jobDisplay.pending.length === 0) && <NoResultsBlock text="No pending jobs" />}
        </div>
      )}

      {jobStatusList.includes('ACTIVE') && (
        <div>
          <SectionHeader title="Active" />
          {jobDisplay.active && jobDisplay.active.length > 0 && jobDisplay.active}
          {(!jobDisplay.active || jobDisplay.active.length === 0) && <NoResultsBlock text="No active jobs" />}
        </div>
      )}
    </>
  )
}
