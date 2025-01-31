import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import JobMessagesWrapper from "@ui/jobItem/jobMessages/jobMessagesWrapper";
import JobDetails from "@ui/jobItem/jobDetails";

import { Suspense } from "react";

export default async function SharedJobPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;

  return (
    <PageWrapper pageHeaderTitle="Job Details">
      <Suspense fallback={<ResultsLoading />}>
        <JobDetails jobId={jobId} />
      </Suspense>
      <Suspense fallback={<ResultsLoading />}>
        <JobMessagesWrapper jobId={jobId} />
      </Suspense>
    </PageWrapper>
  );
}
