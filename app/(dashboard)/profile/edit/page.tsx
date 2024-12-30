import EditUserFormWrapper from "@ui/profile/editUserFormWrapper";
import PageHeader from "@components/pageHeader";
import { Suspense } from "react";
import ResultsLoading from "@components/resultsLoading";

export default function EditUser() {

  return (
    <div className="flex flex-col h-screen p-3">
      <PageHeader title="Edit Profile" />
      <div className="flex bg-gray-300 border border-gray-700 rounded-lg p-6 mt-4">
        <Suspense fallback={<ResultsLoading />}>
          <EditUserFormWrapper />
        </Suspense>
      </div>
    </div>
  );
}
