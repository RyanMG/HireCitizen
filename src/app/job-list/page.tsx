'use client'

import PageHeader from "@/components/pageHeader";
import Searchbar from "@/components/searchbar";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchJobs } from "@/api/jobApi";
import { debounce as _debounce } from 'lodash';
import Loading from "@/components/loading";
import JobSearchResult from "@/components/jobSearchResult"
import { useRouter } from "next/navigation";

export default function JobList() {
  const router = useRouter();
  const [jobSearchTerm, setJobSearchTerm] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: [`search-jobs`, jobSearchTerm],
    queryFn: () => searchJobs({ searchText: jobSearchTerm })
  });

  const debouncedSearch = useMemo(() => {
    return _debounce(() => setJobSearchTerm(searchValue), 500);
  }, [searchValue]);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col p-4 pr-7 h-full">
      <PageHeader title="Job Listings" />
      <Searchbar
        value={searchValue}
        onInputChange={(e) => {
          setSearchValue(e.target.value);
          router.push(`?searchTerm=${searchValue}&filters=${filters.join(',')}`);
        }}
      />
      <div className="flex flex-col gap-4 flex-1">

        {isLoading &&
          <div className="flex flex-col items-center justify-center h-full">
            <Loading />
          </div>
        }
        {error && <div className="text-red-500">{error.message}</div>}

        <div className="flex flex-row flex-wrap">
          {jobs && jobs.map((job) => (
            <JobSearchResult jobData={job} key={job.id} />
          ))}
        </div>

      </div>
    </div>
  );
}
