'use server';

import { auth } from 'auth';
import { redirect } from 'next/navigation';
import PrimaryProfileDetailsBlock from './components/primaryProfileDetailsBlock';
import ProfileActionButtons from './components/profileActionBtns';
import LineBreak from '../components/lineBreak';
import TimezoneLanguage from './components/timezoneLanguage';
import ProfileDetailsItem from './components/profileDetailsItem';
import Reputation from './components/reputation';

export default async function UserProfile() {
  const session = await auth();

  if (!session || !session.activeUser) {
    redirect('/api/auth/force-signout');
  }

  const activeUser = session.activeUser;

  return (
    <>
      <div className="flex flex-row justify-between">
        <PrimaryProfileDetailsBlock user={activeUser} />
        <ProfileActionButtons />
      </div>

      <TimezoneLanguage timezone={activeUser?.timezone.name} language={activeUser?.language.name} />

      <div className="flex flex-row mt-4 gap-6">
        <ProfileDetailsItem label="Registered Email" value={activeUser?.email || 'None'} />
        <ProfileDetailsItem label="Registered Phone Number" value={activeUser?.phone || 'None'} />
      </div>

      <LineBreak />

      <Reputation
        person={activeUser}
        employeeText="Your Employee Reputation"
        employerText="Your Employer Reputation"
      />
    </>
  );
}
