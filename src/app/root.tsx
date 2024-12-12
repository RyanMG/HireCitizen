'use client'

import Sidebar from "@/app/sidebar/page";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query"
import { fetchActiveUser } from "@/api/userApi";
import Notification from "./notifications";
import { useEffect, useState } from "react";
import Snackbar from "@/components/snackbar";

export default function ProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hadLoadError, setHadLoadError] = useState<boolean>(false);

  const { isLoading, error, data: activeUser } = useQuery({
    queryKey: [`fetch-active-user`],
    queryFn: () => fetchActiveUser(1)
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      setHadLoadError(true);
    }

    if (activeUser &&  Object.keys(activeUser).length === 0) {
      console.log("No active user found");
      setHadLoadError(true);
    }
  }, [error, activeUser]);

  return (
    <div className="flex flex-row h-full w-full">

      {isLoading && <Loading />}

      {hadLoadError && <Snackbar message="Error loading user data" type="error" />}

      {activeUser && Object.keys(activeUser).length > 0 &&
        <>
          <Sidebar />
          <main className="flex-grow">
            {children}
          </main>
          <Notification />
        </>
      }
    </div>
  );
}
