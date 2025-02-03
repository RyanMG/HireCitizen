'use server';

import { getPersonById } from "@/app/lib/query/person/data";
import NotificationSnackbar from "../components/notificationSnackbar";
import PrimaryProfileDetailsBlock from "./components/primaryProfileDetailsBlock";
import LineBreak from "../components/lineBreak";
import TimezoneLanguage from "./components/timezoneLanguage";
import Reputation from "./components/reputation";

export default async function CitizenProfile({
  memberId
}: {
  memberId: string
}) {

  const member = await getPersonById(memberId);

  if ('error' in member) {
    return <NotificationSnackbar
      type="error"
      messages={[member.error]}
      redirectTo="/"
    />
  }

  return (
    <>
      <PrimaryProfileDetailsBlock user={member} />
      <TimezoneLanguage
        timezone={member?.timezone.name}
        language={member?.language.name}
      />

      <LineBreak />
      <Reputation
        person={member}
        employeeText="Citizen's Employee Reputation"
        employerText="Citizen's Employer Reputation"
      />
    </>
  );
}
