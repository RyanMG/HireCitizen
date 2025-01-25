import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@components/resultsLoading";
import EditJobFormWrapper from "@ui/employerPages/editJob/editJobFormWrapper";
import { Suspense } from "react";

export default async function EditJob(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    back?: string
  }>
}) {
  const { back } = await props.searchParams;
  const backUrl = back ? `/${back}` : undefined;

  return (
    <PageWrapper pageHeaderTitle="Edit Job" showBackButton={backUrl ? true : false} pageBackPath={backUrl}>
      <Suspense fallback={<ResultsLoading />}>
        <EditJobFormWrapper params={props.params} />
      </Suspense>
    </PageWrapper>
  )
}
