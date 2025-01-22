import PageWrapper from "@/app/ui/components/pageWrapper";

export default async  function JobHistory(props: { params: Promise<{ id: string }> }) {
  const jobParams = await props.params;
  const jobId = jobParams?.id || '';

  return (
    <PageWrapper pageHeaderTitle="UPCOMING JOB TITLE HERE">
      <h1>Job ID: {jobId}</h1>
    </PageWrapper>
  );
}
