import { removePersonByEmail } from "@/app/lib/query/person/actions";
import { auth, signOut } from "@/auth";
import Button from "@mui/material/Button";
import Link from "next/link";

export default async function SignOutPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="border border-gray-700 rounded-lg bg-gray-300 p-6">

        <div className="flex flex-row gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
          </svg>
          <h1 className="text-2xl font-semibold text-gray-800">Sign Out</h1>
        </div>

        <p className="text-gray-800">Are you sure you want to sign out?</p>

        <div className="flex flex-row gap-2 pt-4">
          <form
            action={async () => {
              'use server';

              if (session?.activeUser) {
                const resp = await removePersonByEmail(session?.activeUser?.email as string);
                if (resp?.error) {
                  console.error(resp.error);
                }
                session.activeUser = null;
              }

              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="outlined" color="primary" type="submit">
              Sign Out
            </Button>
          </form>

          <Button variant="outlined" color="primary" className="mt-4">
            <Link href="/profile">
              Cancel
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
