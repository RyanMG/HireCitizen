import { CrewRole, Job } from "@/app/lib/definitions/job";
import { getCrewRoles, getJobById } from "@/app/lib/query/job/data";
import PageWrapper from "@/app/ui/components/pageWrapper";
import JobCrewRoleList from "@/app/ui/jobCommon/jobCrewRoleList";

export default async function AddCrewRolesToNewJob(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const job: Job | { error: string } = await getJobById(id);

  if ('error' in job) {
    return <div>Error: {job.error}</div>;
  }

  const crewRoles: CrewRole[] | { error: string } = await getCrewRoles(job.jobType.id);

  if ('error' in crewRoles) {
    return <div>Error: {crewRoles.error}</div>;
  }

  return (
    <PageWrapper pageHeaderTitle="Add Crew Roles">
      <JobCrewRoleList
        jobId={id}
        crewRoles={crewRoles}
        currentJobType={job.jobType}
      />
    </PageWrapper>
  );
}
