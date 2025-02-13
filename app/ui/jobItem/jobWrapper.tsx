'use server';

import { TPerson } from "@definitions/person";

import { getJobById } from "@query/job/data";

import { Suspense } from "react";

import JobMessagesWrapper from "@ui/jobItem/jobMessages/jobMessagesWrapper";
import CurrentCrewMembers from "@ui/jobItem/currentJobCrew/currentCrewMembers";
import JobDetails from "@ui/jobItem/jobDetails";
import CrewRoleApplications from "@ui/employerPages/crewRoleApplications/incomingCrewRoleApplications";
import UnfilledJobRoles from "@ui/jobItem/jobRoles/unfilledJobRoles";

import ResultsLoading from "@components/resultsLoading";
import NotificationSnackbar from "@components/notificationSnackbar";
import { auth } from "@/auth";
import { getAcceptedCrewMembers } from "@query/jobRoles/data";
import { userIsNotAuthorizedToViewJob } from "@/app/lib/utils/personUtils";

export default async function JobWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const session = await auth();
  const user = session?.activeUser as TPerson;
  const [job, currentCrew] = await Promise.all([
    getJobById(jobId),
    getAcceptedCrewMembers(jobId)
  ]);

  if ('error' in job || 'error' in currentCrew) {
    return (
      <NotificationSnackbar
        type="error"
        messages={['error' in job ? job.error : '', 'error' in currentCrew ? currentCrew.error : ''].filter(Boolean) as string[]}
        redirectTo={`/`}
      />
    )
  }

  if (!user || userIsNotAuthorizedToViewJob({
    job: job,
    crew: currentCrew,
    userId: user.id
  })) {
    return (
      <NotificationSnackbar
        type="warning"
        messages={['You are not authorized to view this job.']}
        redirectTo="/"
      />
    )
  }

  return (
    <>
      <JobDetails job={job} backPath={`job/${job.id}`} />
      <Suspense fallback={<ResultsLoading />}>
        <CurrentCrewMembers currentCrew={currentCrew} />
      </Suspense>

      <Suspense fallback={<ResultsLoading />}>
        <UnfilledJobRoles job={job} />
      </Suspense>

      {user && job.owner.id === user.id && (
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
