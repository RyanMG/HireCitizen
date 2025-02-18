import PageWrapper from "@/app/ui/components/pageWrapper";
import CompletedJobsList from "@ui/employerPages/completed/CompletedJobsList";

export default function CompletedJobsPage() {
  return (
    <PageWrapper pageHeaderTitle="Completed Jobs">
      <CompletedJobsList />
    </PageWrapper>
  );
}
