import CompletedJobCard from './CompletedJobCard';
import SectionHeader from "@components/sectionHeader";
import { getAllPastJobsJobs } from "@query/job/data";

export default async function CompletedJobsList() {
  const completedJobs = await getAllPastJobsJobs();

  if ('error' in completedJobs) {
    return <div>{completedJobs.error}</div>;
  }

  const completedJobsSort = completedJobs.reduce((acc, job) => {
    const status = job.status?.toLowerCase() || '';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(<CompletedJobCard job={job} key={job.id} />);
    return acc;
  }, {} as { [key: string]: React.ReactNode[] });

  return (
    <>
      {completedJobsSort.active && completedJobsSort.active.length > 0 && (
        <div>
          <SectionHeader title="Past Due" />
          {completedJobsSort.active}
        </div>
      )}
      {completedJobsSort.complete && completedJobsSort.complete.length > 0 && (
        <div>
          <SectionHeader title="Completed" />
          {completedJobsSort.complete}
        </div>
      )}
      {completedJobsSort.canceled && completedJobsSort.canceled.length > 0 && (
        <div>
          <SectionHeader title="Canceled Jobs" />
          {completedJobsSort.canceled}
        </div>
      )}
    </>
  )
}
