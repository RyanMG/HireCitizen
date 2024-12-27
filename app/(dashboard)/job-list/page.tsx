import PageHeader from "@components/pageHeader";
import Searchbar from "@components/searchbar";
import { Suspense } from "react";
import JobResultList from "@ui/job-list/jobResultList";

export default async function JobList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col p-4 pr-7 h-full">
      <PageHeader title="Job Listings" />
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <JobResultList searchTerm={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
