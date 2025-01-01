import PageHeader from "@components/pageHeader";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import { Suspense } from "react";
import JobDetails from "@/app/ui/jobDetails/jobDetails";

export default function JobSearchResult(props: { params: Promise<{ id: string }> }) {

  return (
    <div className="flex flex-col p-4 h-screen">
      <PageHeader
        showBackButton={true}
        title="Job Details"
      />
      <Suspense fallback={<ResultsLoading />}>
        <JobDetails params={props.params} />
      </Suspense>
    </div>
  )
}
