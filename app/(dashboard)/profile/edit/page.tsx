import EditUserFormWrapper from "@ui/profile/editUserFormWrapper";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";
import PageWrapper from "@/app/ui/components/pageWrapper";

export default function EditUser() {

  return (
    <PageWrapper pageHeaderTitle="Edit Profile">
      <div className="flex bg-gray-300 border border-gray-700 rounded-lg p-6 mt-4">
        <Suspense fallback={<ResultsLoading />}>
          <EditUserFormWrapper />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
