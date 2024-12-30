'use server';

import { auth } from "@/auth";
import { Timezone } from "@/app/lib/definitions/misc";
import { getTimezones } from "@/app/lib/query/job/data";
import EditUserProfileForm from "@ui/profile/editUserProfileForm";

export default async function EditUserFormWrapper() {
  const session = await auth();

  const timezones: Timezone[] | { message: string } = await getTimezones();

  if ('message' in timezones) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{timezones.message}</p>;
  }

  return (
    <>
      <EditUserProfileForm session={session} timezones={timezones} />
    </>
  );
}
