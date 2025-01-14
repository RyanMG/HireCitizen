'use server';

import PageWrapper from "@components/pageWrapper";
import ResultsLoading from "@components/resultsLoading";
import CitizenProfile from "@/app/ui/profile/citizenProfile";
import { Suspense } from "react";

export default async function MemberProfilePage(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    back?: string
  }>
}) {
  const { id } = await props.params;
  const { back } = await props.searchParams;
  const backUrl = back ? `/${back}` : undefined;

  return (
    <PageWrapper pageHeaderTitle="Citizen Profile" showBackButton={backUrl ? true : false} pageBackPath={backUrl}>
      <div className="flex flex-col bg-gray-900 p-4 rounded-xl border border-indigo-900 min-h-[200px]">
        <Suspense fallback={<ResultsLoading />}>
          <CitizenProfile memberId={id} />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
