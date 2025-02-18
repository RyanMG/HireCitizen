import { TJobApplicant } from "@/app/lib/definitions/job";
import { auth } from "@/auth";
import SectionHeader from "@components/sectionHeader";
import Link from "next/link";
import RemoveSelfFromJobBtn from "./removeSelfFromJobBtn";
import RemoveCrewMemberBtn from "./RemoveCrewMemberBtn";

function CurrentCrewMemberListing({ crewMember, userId, ownerId }: { crewMember: TJobApplicant, userId: string, ownerId: string }) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-2 pb-1 border-b border-gray-800">
      <div className="w=1/2">
        <Link href={`/profile/${crewMember.person.id}?back=work-history/accepted-jobs/${crewMember.jobId}`} className="text-blue">
          <p className="text-light-blue text-md font-semibold">{crewMember.person.moniker}</p>
        </Link>
      </div>

      <div className="w=1/2">
        <p className="text-gray-200 text-sm font-semibold">{crewMember.crewRole.name}</p>
      </div>

      <div className="w-24">
        {userId === crewMember.person.id &&
          <RemoveSelfFromJobBtn jobId={crewMember.jobId} roleId={crewMember.crewRole.id} />
        }
        {userId === ownerId &&
          <RemoveCrewMemberBtn jobId={crewMember.jobId} roleId={crewMember.crewRole.id} crewMemberId={crewMember.person.id} />
        }
      </div>
    </div>
  );
}

/*
 * List of all crew currently accepted for this job.
 */
export default async function CurrentCrewMembers({
  ownerId,
  currentCrew
}: {
  ownerId: string,
  currentCrew: TJobApplicant[]
}) {
  const session = await auth();
  const userId = session?.activeUser?.id;

  return (
    <div>
      <SectionHeader title="Current Crew Members" />

      {currentCrew.length === 0 && (
        <p className="text-gray-400 text-center italic">No crew members yet.</p>
      )}

      {currentCrew.map((crewMember) => <CurrentCrewMemberListing key={crewMember.id} crewMember={crewMember} ownerId={ownerId} userId={userId!} />)}
    </div>
  );
}
