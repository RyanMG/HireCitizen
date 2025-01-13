import { getPersonById } from "@/app/lib/query/person/data";
import NotificationSnackbar from "../components/notificationSnackbar";
import ProfileImage from "./profileImage";
import Link from "next/link";

export default async function MemberProfile({
  memberId
}: {
  memberId: string
}) {
  const member = await getPersonById(memberId);
  if ('error' in member) {
    return <NotificationSnackbar type="error" messages={[member.error]} />
  }

  return (
    <>
    <div className="flex flex-row gap-4">
      <div>
        <ProfileImage image={member?.profile_image || null} />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-2xl font-bold text-gray-300">{member?.moniker || "Unknown Citizen"}</h1>
        <p className="text-gray-300"><span className="text-gray-500 italic">RSI Handle:</span> <span className="font-bold">{member?.handle || "Unknown Handle"}</span></p>
        {member?.rsi_url ? (
          <Link href={member?.rsi_url || ''} target="_blank" className="text-gray-300">View on RSI</Link>
        ) : (
          <p className="text-gray-300 italic">No citizen profile found</p>
        )}
      </div>
    </div>
    <div className="flex flex-row mt-4 gap-6">
      <p className="text-gray-300"><span className="text-gray-500 italic">Timezone:</span> <span className="font-bold">{member?.timezone.name}</span></p>
      <p className="text-gray-300"><span className="text-gray-500 italic">Language:</span> <span className="font-bold">{member?.language.name}</span></p>
    </div>
  </>
  );
}
