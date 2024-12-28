import { auth } from 'auth';
import Image from 'next/image';

export default async function UserProfile() {
  const session = await auth();
  const user = session?.user;

  return (
    <Image
      src={user?.image || ''}
      alt={user?.name || ''}
      width={100}
      height={100}
      className="rounded-full"
    />
  );
}