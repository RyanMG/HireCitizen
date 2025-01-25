import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import SectionHeader from "@/app/ui/components/sectionHeader";
import UpcomingJobs from "@ui/employeePages/jobHistory/upcomingJobs";
import WorkHistory from "@ui/employeePages/jobHistory/workHistory";

import { Suspense } from "react";

export default function JobHistory() {

  return (
    <PageWrapper pageHeaderTitle="Your Work History">
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