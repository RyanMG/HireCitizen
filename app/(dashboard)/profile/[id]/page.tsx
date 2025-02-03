'use server';

import PageWrapper from "@components/pageWrapper";
import ResultsLoading from "@components/resultsLoading";
import CitizenProfile from "@/app/ui/profile/citizenProfile";
import { Suspense } from "react";
import ProfileWrapper from "@ui/profile/components/profileWrapper";

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
    <PageWrapper pageHeaderTitle="Citizen Profile" pageBackPath={backUrl}>
      <ProfileWrapper>
        <Suspense fallback={<ResultsLoading />}>
          <CitizenProfile memberId={id} />
        </Suspense>
      </ProfileWrapper>
    </PageWrapper>
  );
}
