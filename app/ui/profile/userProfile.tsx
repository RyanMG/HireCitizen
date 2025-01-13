'use server';

import { auth } from 'auth';
import Link from 'next/link';
import ProfileImage from '@ui/profile/profileImage';
import ProfileActionButtons from '@ui/profile/profileActionBtns';

export default async function UserProfile() {
  const session = await auth();
  const activeUser = session?.activeUser;

  return (
    <>
      <div className="flex flex-row gap-4">
        <div>
          <ProfileImage image={activeUser?.profile_image || null} />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-2xl font-bold text-gray-300">{activeUser?.moniker || "Unknown Citizen"}</h1>
          <p className="text-gray-300"><span className="text-gray-500 italic">RSI Handle:</span> <span className="font-bold">{activeUser?.handle || "Unknown Handle"}</span></p>
          {activeUser?.rsi_url ? (
            <Link href={activeUser?.rsi_url || ''} target="_blank" className="text-gray-300">View on RSI</Link>
          ) : (
            <p className="text-gray-300 italic">No citizen profile found</p>
          )}
        </div>

        <ProfileActionButtons />
      </div>
      <div className="flex flex-row mt-4 gap-6">
        <p className="text-gray-300"><span className="text-gray-500 italic">Timezone:</span> <span className="font-bold">{activeUser?.timezone.name}</span></p>
        <p className="text-gray-300"><span className="text-gray-500 italic">Language:</span> <span className="font-bold">{activeUser?.language.name}</span></p>
      </div>
    </>
  );
}
