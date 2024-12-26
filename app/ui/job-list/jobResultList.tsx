import { searchJobsPaginated } from "@/app/lib/data/jobs/data";
import JobSearchResult from "@ui/job-list/jobSearchResult";


export default async function JobResultList(props: {
  searchTerm: string;
  currentPage: number;
}) {
  const jobs = await searchJobsPaginated(props.searchTerm, props.currentPage);

  return (
    <div>
      {jobs.map((job) => (
        <JobSearchResult jobData={job} key={job.id} />
      ))}
    </div>
  )
}
