import ResultsLoading from "@components/resultsLoading";
import CreateJobFormWrapper from "@ui/createJob/createJobFormWrapper";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";

export default function CreateJob() {
  return (
    <div className="flex flex-col p-4 h-full">
      <PageHeader
        title="Create a Job"
      />

      <Suspense fallback={<ResultsLoading />}>
        <CreateJobFormWrapper />
      </Suspense>

    </div>
  );
}
