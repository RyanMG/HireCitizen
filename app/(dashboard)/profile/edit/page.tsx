import { auth } from "@/auth";
import NewUserProfileForm from "@ui/login/newUserProfileForm";
import PageHeader from "@/app/ui/components/pageHeader";
import { getTimezones } from "@/app/lib/query/job/data";
import { Timezone } from "@/app/lib/definitions/misc";

export default async function EditUser() {
  const session = await auth();

  const timezones: Timezone[] | { message: string } = await getTimezones();

  if ('message' in timezones) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{timezones.message}</p>;
  }

  // if (session?.activeUser?.account_status === 'ACTIVE') {
  //   redirect('/');
  // }

  return (
    <div className="flex flex-col h-screen p-3">
      <PageHeader title="Edit Profile" />
      <div className="border border-gray-700 my-3"/>
      <NewUserProfileForm session={session} timezones={timezones}/>
    </div>
  );
}
