import PageWrapper from "@/app/ui/components/pageWrapper";
import { Suspense } from "react";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import JobDetails from "@/app/ui/jobDetails/jobDetails";

export default function MyJobDetailsPage(props: { params: Promise<{ id: string }> }) {
  return (
    <PageWrapper pageHeaderTitle="Job Details" showBackButton={true}>
      <Suspense fallback={<ResultsLoading />}>
        <JobDetails params={props.params} />
      </Suspense>
    </PageWrapper>
  );
}
