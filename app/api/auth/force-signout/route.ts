import { removePersonByEmail } from "@/app/lib/query/person/actions";
import { auth ,signOut } from "@/auth";

export async function GET() {
  const session = await auth();
  if (session?.activeUser) {
    const resp = await removePersonByEmail(session?.activeUser?.email as string);
    if (resp?.error) {
      console.error(resp.error);
    }
    session.activeUser = null;
  }
  await signOut({ redirectTo: "/" });
  return new Response(null, { status: 200 });
}
