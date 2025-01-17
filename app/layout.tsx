import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@ui/global.css";
import { SessionProvider } from "next-auth/react"
import DashboardRoot from "./dashboardRoot";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue`}
      >
        <main className="flex flex-col">
          <SessionProvider>
            <DashboardRoot>
              {children}
            </DashboardRoot>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
