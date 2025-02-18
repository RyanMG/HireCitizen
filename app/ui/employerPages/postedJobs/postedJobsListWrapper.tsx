import JobFilters from "./jobFilters";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";
import MyJobListing from "./postedJobListing";

export default async function ActiveJobsList(props: {
  searchParams?: Promise<{
    jobStatus?: string
  }>
}) {
  const jobStatusListParams = await props.searchParams;
  const jobStatus = jobStatusListParams?.jobStatus || '';
  const statusList = !jobStatus || jobStatus === '' ? [] : jobStatus.split(',');

  return (
    <div>
      <JobFilters types={['PENDING', 'ACTIVE']} />
      <Suspense fallback={<ResultsLoading />}>
        <MyJobListing jobStatusList={statusList} />
      </Suspense>
    </div>
  );
}
