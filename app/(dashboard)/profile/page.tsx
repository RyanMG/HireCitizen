import UserProfile from "@ui/userProfile";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";

export default function Profile() {
  return (
    <div className="flex-grow p-4">
      <PageHeader title="Your Profile" />
      <div className="my-4" />
      <Suspense fallback={<ResultsLoading />}>
        <UserProfile />
      </Suspense>
    </div>
  );
 }