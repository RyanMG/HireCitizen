import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import MyJobsListWrapper from "@ui/employerPages/myJobs/myJobsListWrapper";
import { Suspense } from "react";

export default function MyJobs(props: {
  searchParams?: Promise<{
    jobStatus?: string;
  }>;
}) {
  return (
    <PageWrapper pageHeaderTitle="Your Posted Jobs">
      <Suspense fallback={<ResultsLoading />}>
        <MyJobsListWrapper searchParams={props.searchParams} />
      </Suspense>
    </PageWrapper>
  )
}
