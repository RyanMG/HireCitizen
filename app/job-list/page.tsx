'use client'

import PageHeader from "@components/pageHeader";
import Searchbar from "@components/searchbar";
import { useEffect, useState } from "react";

// import { searchJobs } from "@/api/jobApi";
// import { debounce as _debounce } from 'lodash';
// import Loading from "@/components/loading";
// import JobSearchResult from "@/components/jobSearchResult"
import { useSearchParams, useRouter } from "next/navigation";

export default function JobList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('searchTerm')
  const filtersQuery = searchParams.get('filters')

  // const [jobSearchTerm, setJobSearchTerm] = useState<string>(searchQuery || "");
  const [searchValue, setSearchValue] = useState<string>(searchQuery || "");
  const [filters] = useState<string[]>(filtersQuery ? filtersQuery.split(',') : []);

  // const { data: jobs, isLoading, error } = useQuery({
  //   queryKey: [`search-jobs`, jobSearchTerm],
  //   queryFn: () => searchJobs({ searchText: jobSearchTerm })
  // });

  // const debouncedSearch = useMemo(() => {
  //   return _debounce(() => setJobSearchTerm(searchValue), 500);
  // }, [searchValue]);

  useEffect(() => {
    if (searchValue.length === 0) {
      // debouncedSearch();
      return;
    }

    if (searchValue.length > 3) {
      // debouncedSearch();
      return () => {
        // debouncedSearch.cancel();
      }
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col p-4 pr-7 h-full">
      <PageHeader title="Job Listings" />
      <Searchbar />
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
