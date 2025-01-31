import { TJob } from "@definitions/job";
import { getJobById } from "@query/job/data";

import { Suspense } from "react";

import JobMessagesWrapper from "@ui/jobItem/jobMessages/jobMessagesWrapper";
import CurrentCrewMembers from "@ui/jobItem/currentJobCrew/currentCrewMembers";
import JobDetails from "@ui/jobItem/jobDetails";

import ResultsLoading from "@components/resultsLoading";
import NotificationSnackbar from "@components/notificationSnackbar";

export default async function JobWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const job: TJob | { error: string } = await getJobById(jobId);

  if ('error' in job) {
    return (
      <NotificationSnackbar
        type="error"
        messages={[job.error]}
      />
    )
  }

  return (
    <>
      <JobDetails job={job} />
      <Suspense fallback={<ResultsLoading />}>
        <CurrentCrewMembers jobId={jobId} />
      </Suspense>
      <Suspense fallback={<ResultsLoading />}>
        <JobMessagesWrapper jobId={jobId} />
      </Suspense>
    </>
  );
}
