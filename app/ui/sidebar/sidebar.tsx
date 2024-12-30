import SideBarLink from '@ui/sidebar/sidebarLink';
import HireCitizenLogo from './hcLogo';
import Link from 'next/link';
import SignInLink from './signInLink';
import { auth } from '@/auth';

export default async function SideNav() {
  const session = await auth();

  return (
    <aside className="w-full flex-none md:w-64 p-2">
      <div className="bg-dark-blue rounded-xl border border-indigo-900 flex h-full flex-col px-3 py-4 md:px-2">

        <div className="flex flex-row justify-between pb-3">
          <HireCitizenLogo />

          {/* @TODO handle single col showing navigation */}
          <div className="flex md:hidden flex-col justify-center">
            <svg className="fill-gray-300 hover:fill-gray-100" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </div>
        </div>

        <div className="hidden md:flex grow justify-between flex-col space-x-0 space-y-2 px-2">
           <SideBarLink link="/job-list" text="Job Listings">
              <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
            </SideBarLink>

            <SideBarLink link="/create-job" text="Create A Job">
              <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/>
            </SideBarLink>

            <SideBarLink link="/job-history" text="Job History">
              <path d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z"/>
            </SideBarLink>

            {session ? (
              <SideBarLink link="/profile" text="My Profile">
                <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"/>
              </SideBarLink>
            ) : (
              <SignInLink />
            )}

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
