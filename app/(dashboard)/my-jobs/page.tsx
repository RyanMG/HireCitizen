import PageHeader from "@/app/ui/components/pageHeader";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import ActiveJobsList from "@/app/ui/myJobs/activeJobsList";
import { Suspense } from "react";

export default function MyJobs() {
  return (
    <div className="flex flex-col p-4 pr-7 h-screen">
      <PageHeader title="Active Job Listings" />
      <Suspense fallback={<ResultsLoading />}>
        <ActiveJobsList />
      </Suspense>
    </div>
  )
}
