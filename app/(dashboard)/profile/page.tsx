import UserProfile from "@ui/userProfile";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";

export default function Profile() {
  return (
    <div className="flex-grow p-4">
      <PageHeader title="Your Profile" />
      <div className="my-4" />
      <div className="flex flex-col bg-gray-900 p-4 rounded-xl border border-indigo-900 min-h-[200px]">
        <Suspense fallback={<ResultsLoading />}>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  );
 }