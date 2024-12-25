import PageHeader from "@components/pageHeader";
import Searchbar from "@components/searchbar";
import { Suspense } from "react";

export default function JobList() {

  return (
    <div className="flex flex-col p-4 pr-7 h-full">
      <PageHeader title="Job Listings" />
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      <div className="flex flex-col gap-4 flex-1">

        {/* {isLoading &&
          <div className="flex flex-col items-center justify-center h-full">
            <Loading />
          </div>
        }
        {error && <div className="text-red-500">{error.message}</div>}

        <div className="flex flex-row flex-wrap">
          {jobs && jobs.map((job) => (
            <JobSearchResult jobData={job} key={job.id} />
          ))}
        </div> */}

      </div>
    </div>
  );
}
