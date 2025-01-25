import ResultsLoading from "@components/resultsLoading";
import CreateJobFormWrapper from "@ui/employerPages/createJob/createJobFormWrapper";
import { Suspense } from "react";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default function CreateJob() {
  return (
    <PageWrapper pageHeaderTitle="Create a Job">
      <Suspense fallback={<ResultsLoading />}>
        <CreateJobFormWrapper />
      </Suspense>
    </PageWrapper>
  );
}
