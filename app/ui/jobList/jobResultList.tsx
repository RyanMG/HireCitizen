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
      {jobs.map((job) => {
        let backPath = `/job-search`;
        if (searchTerm && currentPage) {
          // Escape the ? and & characters. Since I am using these search param keys in a search param
          // it was failing to be parsed properly.
          backPath += `	%3Fpage=${currentPage}%26query=${searchTerm}`;
        }
        return <JobSearchResult jobData={job} key={job.id} backPath={backPath} />
      })}
      {currentPage > 1 && <LoadPrevBtn />}
      {jobs.length === 8 && <LoadMoreBtn />}
    </div>
  )
}
