/**
 * Job Overview - job page for people not accepted for or the job owner
 */
'use server';

import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";
import PageWrapper from "@/app/ui/components/pageWrapper";
import JobOverviewWrapper from "@/app/ui/jobItem/jobOverviewWrapper";

export default async function JobSearchResult(props: { params: Promise<{ id: string }>, searchParams: Promise<{ back: string }> }) {
  const params = await props.searchParams;

  return (
    <PageWrapper pageHeaderTitle="Job Overview" pageBackPath={params.back}>
      <Suspense fallback={<ResultsLoading />}>
        <JobOverviewWrapper params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
