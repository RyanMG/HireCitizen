import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import UpcomingJobs from "@ui/employeePages/upcomingJobs";
import { Suspense } from "react";

export default function ScheduledJobs() {
  return (
    <PageWrapper pageHeaderTitle="Scheduled Jobs">
      <Suspense fallback={<ResultsLoading />}>
        <UpcomingJobs />
      </Suspense>
    </PageWrapper>

  );
}