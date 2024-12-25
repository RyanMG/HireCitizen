import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@ui/global.css";

import Sidebar from "@ui/sidebar/sidebar";
import Notification from "@ui/notifications/notifications";

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          <main className="flex flex-col">

            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <Sidebar />
              <section className="flex-grow">
                {children}
              </section>
              <Notification />
            </div>

          </main>
        {/* </LocalizationProvider> */}
      </body>
    </html>
  );
}
