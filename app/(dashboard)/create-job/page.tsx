import ResultsLoading from "@components/resultsLoading";
import CreateJobForm from "@/app/ui/createJob/createJobForm";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";

export default function CreateJob() {
  return (
    <div className="flex flex-col p-4 h-full">
      <PageHeader
        title="Create a Job"
      />

      <Suspense fallback={<ResultsLoading />}>
        <CreateJobForm />
      </Suspense>

    </div>
  );
}
