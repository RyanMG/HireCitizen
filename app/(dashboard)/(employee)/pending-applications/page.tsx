import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import PendingApplications from "@ui/employeePages/pendingApplications";
import { Suspense } from "react";

export default function PendingApplicationsPage() {

  return (
    <PageWrapper pageHeaderTitle="Pending Applications">
      <Suspense fallback={<ResultsLoading />}>
        <PendingApplications />
      </Suspense>
    </PageWrapper>
  );
}
