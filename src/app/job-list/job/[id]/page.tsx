'use client'

import { getJob } from "@/api/jobApi";
import PageHeader from "@/components/pageHeader";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";

export default function JobSearchResult() {
  const router = useRouter();
  const pathname = usePathname();
  const jobId = Number(pathname.split("/").pop());

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: [`get-job`],
    queryFn: () => getJob({ jobId })
  });


  return (
    <div className="flex flex-col p-4">
      <PageHeader
        showBackButton={true}
        title="Job Details"
        pageBackFn={() => {
          router.back();
        }}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {jobs && <h1>Job {jobs.id}</h1>}
    </div>
  )
}
