import Searchbar from "@components/searchbar";
import { Suspense } from "react";
import JobResultList from "@ui/jobList/jobResultList";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default function JobList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  return (
    <PageWrapper pageHeaderTitle="Job Listings">
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>

      <Suspense fallback={<ResultsLoading />}>
        <JobResultList searchParams={props.searchParams} />
      </Suspense>
    </PageWrapper>
  );
}
