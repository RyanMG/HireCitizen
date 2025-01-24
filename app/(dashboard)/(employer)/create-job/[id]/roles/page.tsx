import PageWrapper from "@/app/ui/components/pageWrapper";
import ResultsLoading from "@/app/ui/components/resultsLoading";
import AddCrewRolesWrapper from "@/app/ui/createJob/addCrewRolesWrapper";
import { Suspense } from "react";

export default async function AddCrewRolesToNewJob(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return (
    <PageWrapper pageHeaderTitle="Add Crew Roles">
      <Suspense fallback={<ResultsLoading />}>
        <AddCrewRolesWrapper id={id} />
      </Suspense>
    </PageWrapper>
  );
}
