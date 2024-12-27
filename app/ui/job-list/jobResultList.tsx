import { searchJobsPaginated } from "@/app/lib/data/jobs/data";
import JobSearchResult from "@ui/job-list/jobSearchResult";
import { LoadPrevBtn, LoadMoreBtn } from "../components/loadMoreBtn";

export default async function JobResultList(props: {
  searchTerm: string;
  currentPage: number;
}) {
  const jobs = await searchJobsPaginated(props.searchTerm, props.currentPage);

  return (
    <div className="overflow-auto">
      {jobs.map((job) => (
        <JobSearchResult jobData={job} key={job.id} />
      ))}
      {props.currentPage > 1 && <LoadPrevBtn />}
      {jobs.length === 8 && <LoadMoreBtn />}
    </div>
  )
}
