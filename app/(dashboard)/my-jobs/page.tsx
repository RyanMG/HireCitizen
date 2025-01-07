import PageHeader from "@/app/ui/components/pageHeader";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import MyJobsListWrapper from "@/app/ui/myJobs/myJobsListWrapper";
import { Suspense } from "react";

export default function MyJobs(props: {
  searchParams?: Promise<{
    jobStatus?: string;
  }>;
}) {
  return (
    <div className="flex flex-col p-4 pr-7 h-screen">
      <PageHeader title="Your Posted Jobs" />
      <Suspense fallback={<ResultsLoading />}>
        <MyJobsListWrapper searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}
