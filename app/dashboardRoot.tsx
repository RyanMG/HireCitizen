'use server';

import { auth } from "@/auth";
import Sidebar from "./ui/sidebar/sidebar";
import Notification from "@ui/notifications/notifications";

export default async function DashboardRoot({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <section className="flex-grow">
        {children}
      </section>
      {session && session.activeUser && <Notification />}
    </div>
  );
}
