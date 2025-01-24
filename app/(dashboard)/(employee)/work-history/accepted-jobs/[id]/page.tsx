import { getJobById } from "@query/job/data";
import PageWrapper from "@components/pageWrapper";
import ResultsLoading from "@components/resultsLoading";
import NotificationSnackbar from "@components/notificationSnackbar";

import AcceptedJobDetails from "@ui/acceptedJobs/acceptedJobDetails";
import CurrentCrewMembers from "@ui/acceptedJobs/currentCrewMembers";
import JobMessages from "@ui/jobCommon/jobMessagesWrapper";

import { Suspense } from "react";

export default async  function JobHistory(props: { params: Promise<{ id: string }> }) {
  const jobParams = await props.params;
  const jobId = jobParams?.id || '';
  const job = await getJobById(jobId);

  if ('error' in job) {
    return <NotificationSnackbar type="error" messages={[job.error]} />;
  }

  return (
    <PageWrapper pageHeaderTitle={job?.title || ''}>
      <AcceptedJobDetails job={job} />
      <Suspense fallback={<ResultsLoading />}>
        <CurrentCrewMembers jobId={jobId} />
      </Suspense>
      <Suspense fallback={<ResultsLoading />}>
        <JobMessages jobId={jobId} />
      </Suspense>
    </PageWrapper>
  );
}
