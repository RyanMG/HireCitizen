import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import SectionHeader from "@/app/ui/components/sectionHeader";
import PendingApplications from "@/app/ui/jobHistory/pendingApplications";
import UpcomingJobs from "@ui/jobHistory/upcomingJobs";
import WorkHistory from "@ui/jobHistory/workHistory";

import { Suspense } from "react";

export default function JobHistory() {
  return (
    <PageWrapper pageHeaderTitle="Your Work History">
      <SectionHeader title="Pending Applications" />
      <Suspense fallback={<ResultsLoading />}>
        <PendingApplications />
      </Suspense>
      <SectionHeader title="Upcoming Jobs" />
      <Suspense fallback={<ResultsLoading />}>
        <UpcomingJobs />
      </Suspense>
      <SectionHeader title="Work History" />
      <Suspense fallback={<ResultsLoading />}>
        <WorkHistory />
      </Suspense>
    </PageWrapper>
  );
}