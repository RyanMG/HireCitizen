import { searchJobsPaginated } from "@/app/lib/query/job/data";
import JobSearchResult from "@ui/jobList/jobSearchResult";
import { LoadPrevBtn, LoadMoreBtn } from "../components/loadMoreBtn";

export default async function JobResultList(props: { searchParams: Promise<{ query?: string; page?: string }> | undefined }) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const jobs = await searchJobsPaginated(searchTerm, currentPage);

  if ('message' in jobs) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{jobs.message}</p>;
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
