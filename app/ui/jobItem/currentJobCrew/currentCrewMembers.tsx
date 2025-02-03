import { TJobApplicant } from "@/app/lib/definitions/job";
import SectionHeader from "@components/sectionHeader";
import Link from "next/link";

export default async function CurrentCrewMembers({ currentCrew }: { currentCrew: TJobApplicant[] }) {

  return (
    <div>
      <SectionHeader title="Current Crew Members" />

      {currentCrew.length === 0 && (
        <p className="text-gray-400 text-center italic">No crew members yet.</p>
      )}

      {currentCrew.map((crewMember) => (
        <div key={crewMember.id} className="flex flex-row items-center gap-4">
          <Link href={`/profile/${crewMember.person.id}?back=work-history/accepted-jobs/${crewMember.jobId}`} className="text-blue">
            <p className="text-light-blue text-md font-semibold">{crewMember.person.moniker}</p>
          </Link>

          <p className="text-gray-200 text-md">-</p>
          <p className="text-gray-200 text-md font-semibold">{crewMember.crewRole.name}</p>
        </div>
      ))}
    </div>
  );
}
