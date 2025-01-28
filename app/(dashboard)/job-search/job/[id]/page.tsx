import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";
import JobDetails from "@/app/ui/jobDetails/jobDetails";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default async function JobSearchResult(props: { params: Promise<{ id: string }>, searchParams: Promise<{ back: string }> }) {
  const params = await props.searchParams;

  return (
    <PageWrapper pageHeaderTitle="Job Details" pageBackPath={params.back}>
      <Suspense fallback={<ResultsLoading />}>
        <JobDetails params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
