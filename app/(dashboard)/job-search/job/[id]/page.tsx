import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";
import JobDetails from "@/app/ui/jobDetails/jobDetails";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default function JobSearchResult(props: { params: Promise<{ id: string }> }) {

  return (
    <PageWrapper pageHeaderTitle="Job Details" showBackButton={true}>
      <Suspense fallback={<ResultsLoading />}>
        <JobDetails params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
