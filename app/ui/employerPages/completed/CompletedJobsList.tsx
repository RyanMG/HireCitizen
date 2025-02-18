import CompletedJobCard from './CompletedJobCard';
import SectionHeader from "@components/sectionHeader";
import JobFilters from "@ui/employerPages/postedJobs/jobFilters";
import NoResultsBlock from '@components/noResultsBlock'
import { getAllPastJobsJobs } from "@query/job/data";

export default async function CompletedJobsList(props: {
  searchParams?: Promise<{
    jobStatus?: string
  }>
}) {
  const jobStatusListParams = await props.searchParams;
  const jobStatus = jobStatusListParams?.jobStatus || '';
  const statusList = !jobStatus || jobStatus === '' ? [] : jobStatus.split(',');

  const completedJobs = await getAllPastJobsJobs(statusList);

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
      <JobFilters types={['COMPLETE', 'CANCELED']} />
      <div>
        <SectionHeader title="Past Due" />
        {completedJobsSort.active && completedJobsSort.active.length > 0 && completedJobsSort.active}
        {(!completedJobsSort.active || completedJobsSort.active.length === 0) && <NoResultsBlock text="No active jobs" />}
      </div>

      {statusList.includes('COMPLETE') && (
        <div>
          <SectionHeader title="Completed" />
          {completedJobsSort.complete && completedJobsSort.complete.length > 0 && completedJobsSort.complete}
          {(!completedJobsSort.complete || completedJobsSort.complete.length === 0) && <NoResultsBlock text="No completed jobs" />}
        </div>
      )}

      {statusList.includes('CANCELED') && (
        <div>
          <SectionHeader title="Canceled Jobs" />
          {completedJobsSort.canceled && completedJobsSort.canceled.length > 0 && completedJobsSort.canceled}
          {(!completedJobsSort.canceled || completedJobsSort.canceled.length === 0) && <NoResultsBlock text="No canceled jobs" />}
        </div>
      )}

    </>
  )
}
