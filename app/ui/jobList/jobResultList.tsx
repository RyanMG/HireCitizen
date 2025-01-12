import { searchJobsPaginated } from "@/app/lib/query/job/data";
import JobSearchResult from "@ui/jobList/jobSearchResult";
import { LoadPrevBtn, LoadMoreBtn } from "../components/loadMoreBtn";
import NotificationSnackbar from "@components/notificationSnackbar";

export default async function JobResultList(props: {
  searchParams: Promise<{
    query?: string
    page?: string
  }> | undefined
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const jobs = await searchJobsPaginated(searchTerm, currentPage);

  if ('error' in jobs) {
    return <NotificationSnackbar
      type="error"
      messages={[jobs.error]}
    />
  }

  return (
    <div className="overflow-auto flex flex-col lg:flex-row flex-wrap">
      {jobs.map((job) => (
        <JobSearchResult jobData={job} key={job.id} />
      ))}
      {currentPage > 1 && <LoadPrevBtn />}
      {jobs.length === 8 && <LoadMoreBtn />}
    </div>
  )
}
