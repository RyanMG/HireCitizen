import PageHeader from "@components/pageHeader";
import ResultsLoading from "@components/resultsLoading";
import EditJobForm from "@/app/ui/myJobs/editJobForm";
import { Suspense } from "react";

export default function EditJob(props: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex flex-col p-4 pr-7 h-screen">
      <PageHeader
        title="Edit Job"
        showBackButton={true}
        pageBackPath={'/my-jobs?jobStatus=PENDING%2CACTIVE'}
      />
      <Suspense fallback={<ResultsLoading />}>
        <EditJobForm params={props.params} />
      </Suspense>
    </div>
  )
}
