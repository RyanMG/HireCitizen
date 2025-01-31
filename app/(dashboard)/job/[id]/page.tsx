/**
 * Job Details - job page for people who are accepted to crew and the job owner
 */
'use server';

import PageWrapper from "@/app/ui/components/pageWrapper";
import JobWrapper from "@ui/jobItem/jobWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";

export default async function SharedJobPage(props: { params: Promise<{ id: string }> }) {

  return (
    <PageWrapper pageHeaderTitle="Job Details">
      <Suspense fallback={<ResultsLoading />}>
        <JobWrapper params={props.params} />
      </Suspense>
    </PageWrapper>
  );
}
