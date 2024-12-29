import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewUserProfileForm from "@ui/login/newUserProfileForm";

export default async function NewUser() {
  const session = await auth();
  console.log('new user page loading');
  if (session?.activeUser?.account_status === 'ACTIVE') {
    redirect('/');
  }

  return (
    <div className="flex flex-col h-screen p-3">
      <h1 className="text-2xl font-bold text-white">Complete your profile</h1>
      <p className="text-white italic pt-2">Please complete the following steps to create your account:</p>
      <div className="border border-gray-700 my-3"/>
      <NewUserProfileForm session={session}/>
    </div>
  );
}
