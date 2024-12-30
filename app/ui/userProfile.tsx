import { auth } from 'auth';
import Link from 'next/link';
import ProfileImage from '@ui/profile/profileImage';
import ProfileActionButtons from '@ui/profile/profileActionBtns';

export default async function UserProfile() {
  const session = await auth();
  const activeUser = session?.activeUser;
  console.log("activeUser", activeUser);

  return (
    <>
      <div className="flex flex-row gap-4">

        <div>
          <ProfileImage session={session} />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-2xl font-bold text-gray-300">{activeUser?.moniker || "Unknown Citizen"}</h1>
          <p className="text-gray-300"><span className="text-gray-500 font-bold">RSI Handle:</span> {activeUser?.handle || "Unknown Handle"}</p>
          {activeUser?.rsi_url ? (
            <Link href={activeUser?.rsi_url || ''} target="_blank" className="text-gray-300">View on RSI</Link>
          ) : (
            <p className="text-gray-300 italic">No citizen profile found</p>
          )}
        </div>

        <ProfileActionButtons />
      </div>
    </>
  );
}
