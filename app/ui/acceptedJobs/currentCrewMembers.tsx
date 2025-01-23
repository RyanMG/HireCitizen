import SectionHeader from "@components/sectionHeader";
import { getAcceptedCrewMembers } from "@query/jobRoles/data";
import NotificationSnackbar from "../components/notificationSnackbar";
import Link from "next/link";

export default async function CurrentCrewMembers({ jobId }: { jobId: string }) {

  const currentCrew = await getAcceptedCrewMembers(jobId);

  if ('error' in currentCrew) {
    return <NotificationSnackbar type="error" messages={[currentCrew.error]} />;
  }

  return (
    <div>
      <SectionHeader title="Current Crew Members" />
      {currentCrew.map((crewMember) => (
        <div key={crewMember.id} className="flex flex-row items-center gap-4">
          <Link href={`/profile/${crewMember.person.id}?back=work-history/accepted-jobs/${jobId}`} className="text-blue">
            <p className="text-light-blue text-md font-semibold">{crewMember.person.moniker}</p>
          </Link>

          <p className="text-gray-200 text-md">-</p>
          <p className="text-gray-200 text-md font-semibold">{crewMember.crewRole.name}</p>
        </div>
      ))}
    </div>
  );
}
