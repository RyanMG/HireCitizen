import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import WorkHistory from "@ui/employeePages/workHistory";

import { Suspense } from "react";

export default function JobHistory() {

  return (
    <PageWrapper pageHeaderTitle="Your Work History">
      <Suspense fallback={<ResultsLoading />}>
        <WorkHistory />
      </Suspense>
    </PageWrapper>
  );
}