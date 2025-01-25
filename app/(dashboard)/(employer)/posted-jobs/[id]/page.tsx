import { Suspense } from "react";

import PageWrapper from "@ui/components/pageWrapper";
import ResultsLoading from "@ui/components/resultsLoading";
import MyJobDetails from "@ui/employerPages/myJobDetails/myJobDetails";
import JobMessagesWrapper from "@ui/jobCommon/jobMessagesWrapper";

export default async function MyJobDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  return (
    <PageWrapper pageHeaderTitle="Job Details" showBackButton={true}>
      <Suspense fallback={<ResultsLoading />}>
        <MyJobDetails jobId={jobId} />
      </Suspense>
      <Suspense fallback={<ResultsLoading />}>
        <JobMessagesWrapper jobId={jobId} />
      </Suspense>
    </PageWrapper>
  );
}
