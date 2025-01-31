import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";
import PageWrapper from "@/app/ui/components/pageWrapper";
import JobOverview from "@/app/ui/jobItem/jobOverview";

export default async function JobSearchResult(props: { params: Promise<{ id: string }>, searchParams: Promise<{ back: string }> }) {
  const params = await props.searchParams;

  return (
    <PageWrapper pageHeaderTitle="Job Details" pageBackPath={params.back}>
      <Suspense fallback={<ResultsLoading />}>
        <JobOverview params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
