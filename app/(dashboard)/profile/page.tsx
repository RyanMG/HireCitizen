import UserProfile from "@ui/profile/userProfile";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";
import PageWrapper from "@/app/ui/components/pageWrapper";
import ProfileWrapper from "@/app/ui/profile/components/profileWrapper";

export default function Profile() {
  return (
    <PageWrapper pageHeaderTitle="Your Profile">
      <ProfileWrapper>
        <Suspense fallback={<ResultsLoading />}>
          <UserProfile />
        </Suspense>
      </ProfileWrapper>
    </PageWrapper>
  );
 }