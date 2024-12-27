import { getJobTypeCategories, getTimezones } from "@/app/lib/data/jobs/data";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import CreateJobForm from "@/app/ui/createJob/createJobForm";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";

export default async function CreateJob() {
  const [jobTypeCategories, timeZones] = await Promise.all([getJobTypeCategories(), getTimezones()]);

  return (
    <div className="flex flex-col p-4">
      <PageHeader
        title="Create A Job"
      />
      <CreateJobForm jobTypeCategories={jobTypeCategories} timeZones={timeZones} />
    </div>
  );
}
