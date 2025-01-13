import { Suspense } from "react";

import PageWrapper from "@ui/components/pageWrapper";
import ResultsLoading from "@ui/components/resultsLoading";
import MyJobDetails from "@ui/myJobDetails/myJobDetails";

export default function MyJobDetailsPage(props: { params: Promise<{ id: string }> }) {
  return (
    <PageWrapper pageHeaderTitle="Job Details" showBackButton={true}>
      <Suspense fallback={<ResultsLoading />}>
        <MyJobDetails params={props.params} />
      </Suspense>
    </PageWrapper>
  );
}
