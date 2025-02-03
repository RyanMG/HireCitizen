import { TJob } from "@definitions/job";
import { TJobApplicant } from "@definitions/job";

export const userIsNotAuthorizedToViewJob = ({
  job,
  crew,
  userId
}: {
  job: TJob,
  crew: TJobApplicant[],
  userId: string
}): boolean => {

  if (job.owner.id === userId) {
    return false;
  }

  if (crew.some((crewMember) => crewMember.person.id === userId)) {
    return false;
  }

  return true;
}
