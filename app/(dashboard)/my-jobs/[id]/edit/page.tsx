import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@components/resultsLoading";
import EditJobFormWrapper from "@ui/editJob/editJobFormWrapper";
import { Suspense } from "react";

export default function EditJob(props: { params: Promise<{ id: string }> }) {
  return (
    <PageWrapper pageHeaderTitle="Edit Job" showBackButton={true} pageBackPath={'/my-jobs?jobStatus=PENDING%2CACTIVE'}>
      <Suspense fallback={<ResultsLoading />}>
        <EditJobFormWrapper params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
