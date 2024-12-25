import { signOut, auth } from "@/auth";
import SideBarLink from "./sidebarLink";

export default async function AuthenticateLink() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2text-lg font-medium text-gray-500 hover:text-gray-300 md:flex-none md:justify-start">
          <SideBarLink text="Sign Out">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
          </SideBarLink>
        </button>
      </form>
    );
  }

  return (
    <button className="flex h-[48px] w-full grow items-center justify-center gap-2text-lg font-medium text-gray-500 hover:text-gray-300 md:flex-none md:justify-start">
      <SideBarLink link="/login" text="Sign In">
        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
      </SideBarLink>
    </button>
  );
}
