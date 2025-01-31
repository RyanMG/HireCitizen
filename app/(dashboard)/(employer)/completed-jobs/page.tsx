import PageWrapper from "@/app/ui/components/pageWrapper";
import NoResultsBlock from "@components/noResultsBlock";

export default function CompletedJobsPage() {
  return (
    <PageWrapper pageHeaderTitle="Completed Jobs">
      <div>
        <NoResultsBlock text="No completed jobs." />
      </div>
    </PageWrapper>
  );
}
