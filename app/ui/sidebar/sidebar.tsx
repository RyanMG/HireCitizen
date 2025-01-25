'use server';

import SideBarLink from '@ui/sidebar/sidebarLink';
import HireCitizenLogo from './hcLogo';
import Link from 'next/link';
import SignInLink from './signInLink';
import SidebarSectionHeader from './sidebarSectionHeader';
import { auth } from '@/auth';

export default async function SideNav() {
  const session = await auth();

  return (
    <aside className="w-full flex-none md:w-64 p-2">
      <div className="bg-dark-blue rounded-xl border border-indigo-900 flex h-full flex-col px-3 py-4 md:px-2">

        <div className="flex flex-row justify-between">
          <HireCitizenLogo />

          {/* @TODO handle single col showing navigation */}
          <div className="flex md:hidden flex-col justify-center">
            <svg className="fill-gray-300 hover:fill-gray-100" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </div>
        </div>

        <div className="hidden md:flex grow justify-between flex-col space-x-0 space-y-4 mt-4 px-2">
           <SideBarLink link="/job-search" text="Search Jobs">
              <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
            </SideBarLink>

            {session && (
              <>
                <SidebarSectionHeader title="EMPLOYERS">
                  <SideBarLink link="/create-job" text="Create A Job">
                    <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/>
                  </SideBarLink>

                  <SideBarLink link="/posted-jobs?jobStatus=PENDING%2CACTIVE" text="My Posted Jobs">
                    <path d="m260-80-40-40v-160H80v-80l60-106v-94H80v-80h360v80h-60v94l60 106v80H300v160l-40 40Zm-88-280h176l-48-84v-116h-80v116l-48 84Zm88 0Zm460-280q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-196-80H80q0-33 23.5-56.5T160-800h364q-2 10-3 19.5t-1 20.5q0 11 1 20.5t3 19.5Zm276 560H480v-80h320v-337q24-11 44-27t36-36v400q0 33-23.5 56.5T800-160Z"/>
                  </SideBarLink>
                </SidebarSectionHeader>

                <SidebarSectionHeader title="EMPLOYEES">
                  <SideBarLink link="/scheduled-jobs" text="Scheduled Jobs">
                    <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
                  </SideBarLink>
                  <SideBarLink link="/work-history" text="Work History">
                    <path d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z"/>
                  </SideBarLink>
                </SidebarSectionHeader>

                <SideBarLink link="/profile" text="My Profile">
                  <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z"/>
                </SideBarLink>
                <SideBarLink link="/messages" text="Messages">
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                </SideBarLink>
              </>
            )}

            {!session && <SignInLink />}

          <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>

          <footer className="flex-end">
            <div className="flex hidden flex-row md:flex">
              <Link href="/about">
                <div className="text-sm leading-3 text-gray-600 cursor-default">© Rad Times 2024</div>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </aside>
  );
}
