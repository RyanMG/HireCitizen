'use client'

import Sidebar from "@/sidebar/page";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query"
import { fetchActiveUser } from "@/api/userApi";

export default function ProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isLoading, error, data: activeUser } = useQuery({
    queryKey: [`fetch-active-user`],
    queryFn: () => fetchActiveUser(1)
  });

  return (
    <div className="flex flex-row h-full w-full">

      {isLoading && <div>Loading...</div>}

      {error && <Loading />}

      {activeUser && Object.keys(activeUser).length > 0 &&
        <>
          <Sidebar />
          <main>
            {children}
          </main>
        </>
      }
    </div>
  );
}
