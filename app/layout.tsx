import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@ui/global.css";

import Sidebar from "./ui/sidebar/sidebar";
import Notification from "@ui/notifications/notifications";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | HireCitizen',
    default: 'HireCitizen',
  },
  description: 'Hire or get hired in the \'verse'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue`}
      >
        <main className="flex flex-col">
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <Sidebar />
            <section className="flex-grow">
              {children}
            </section>
            {session && session.activeUser && <Notification />}
          </div>
        </main>
      </body>
    </html>
  );
}
