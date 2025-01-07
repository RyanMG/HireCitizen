import MyJobFilters from "./myJobFilters";
import { Suspense } from "react";
import ResultsLoading from "../components/resultsLoading";
import MyJobListing from "./myJobListing";

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
      <MyJobFilters />
      <Suspense fallback={<ResultsLoading />}>
        <MyJobListing jobStatusList={statusList} />
      </Suspense>
    </div>
  );
}
