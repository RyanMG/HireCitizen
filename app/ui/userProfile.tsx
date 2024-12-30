import Button from '@mui/material/Button';
import { auth } from 'auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserProfile() {
  const session = await auth();
  const activeUser = session?.activeUser;

  return (
    <>
      <div className="flex flex-row gap-4">

        <div>
          <Image
            src={activeUser?.profile_image || ''}
            alt={activeUser?.moniker || ''}
            width={100}
            height={100}
            className="rounded-xl border border-gray-300"
          />
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

        <div>
          <Button variant="outlined" color="primary">
            <Link href="/profile/edit">
              Edit
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
