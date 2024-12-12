'use client'
import { getJob } from "@/api/jobApi";
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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="border border-gray-300 rounded-full p-2" onClick={() => {
        // @TODO On a deep link this will not go back to the previous page. I need to come back to this.
        router.back();
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
        </svg>
      </div>


      {jobs && <h1>Job {jobs.id}</h1>}
    </div>
  )
}
