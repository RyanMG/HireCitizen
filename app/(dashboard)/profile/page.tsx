import UserProfile from "@ui/profile/userProfile";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default function Profile() {
  return (
    <PageWrapper pageHeaderTitle="Your Profile">
      <div className="flex flex-col bg-gray-900 p-4 rounded-xl border border-indigo-900 min-h-[200px]">
        <Suspense fallback={<ResultsLoading />}>
          <UserProfile />
        </Suspense>
      </div>
    </PageWrapper>
  );
 }