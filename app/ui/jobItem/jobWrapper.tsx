import { TJob } from "@definitions/job";
import { TPerson } from "@definitions/person";

import { getJobById } from "@query/job/data";

import { Suspense } from "react";

import JobMessagesWrapper from "@ui/jobItem/jobMessages/jobMessagesWrapper";
import CurrentCrewMembers from "@ui/jobItem/currentJobCrew/currentCrewMembers";
import JobDetails from "@ui/jobItem/jobDetails";
import CrewRoleApplications from "@ui/employerPages/crewRoleApplications/incomingCrewRoleApplications";

import ResultsLoading from "@components/resultsLoading";
import NotificationSnackbar from "@components/notificationSnackbar";
import { auth } from "@/auth";

export default async function JobWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const session = await auth();
  const user = session?.activeUser as TPerson;
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

      {job.owner.id === user.id && (
        <Suspense fallback={<ResultsLoading />}>
          <CrewRoleApplications job={job} />
        </Suspense>
      )}

      <Suspense fallback={<ResultsLoading />}>
        <JobMessagesWrapper jobId={jobId} />
      </Suspense>
    </>
  );
}
