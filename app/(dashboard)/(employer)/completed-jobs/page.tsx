import PageWrapper from "@/app/ui/components/pageWrapper";
import CompletedJobsList from "@ui/employerPages/completed/CompletedJobsList";

export default function CompletedJobsPage(props: {
  searchParams?: Promise<{
    jobStatus?: string;
  }>;
}) {
  return (
    <PageWrapper pageHeaderTitle="Completed Jobs">
      <CompletedJobsList searchParams={props.searchParams} />
    </PageWrapper>
  );
}
