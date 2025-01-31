import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import PostedJobsListWrapper from "@ui/employerPages/postedJobs/postedJobsListWrapper";
import { Suspense } from "react";

export default function MyJobs(props: {
  searchParams?: Promise<{
    jobStatus?: string;
  }>;
}) {
  return (
    <PageWrapper pageHeaderTitle="Your Posted Jobs">
      <Suspense fallback={<ResultsLoading />}>
        <PostedJobsListWrapper searchParams={props.searchParams} />
      </Suspense>
    </PageWrapper>
  )
}
