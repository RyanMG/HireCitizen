import PageHeader from "@components/pageHeader";
import Searchbar from "@components/searchbar";
import { Suspense } from "react";
import JobResultList from "@ui/jobList/jobResultList";
import ResultsLoading from "@/app/ui/components/resultsLoading";

export default function JobList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  return (
    <div className="flex flex-col p-4 pr-7 h-screen">
      <PageHeader title="Job Listings" />
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>

      <Suspense fallback={<ResultsLoading />}>
        <JobResultList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
