import { getJobById } from "@/app/lib/query/job/data";
import PageWrapper from "@/app/ui/components/pageWrapper";
import NotificationSnackbar from "@components/notificationSnackbar";

export default async  function JobHistory(props: { params: Promise<{ id: string }> }) {
  const jobParams = await props.params;
  const jobId = jobParams?.id || '';
  const job = await getJobById(jobId);

  if ('error' in job) {
    return <NotificationSnackbar type="error" messages={[job.error]} />;
  }

  return (
    <PageWrapper pageHeaderTitle={job?.title || ''}>
      <h1>Job ID: {jobId}</h1>
    </PageWrapper>
  );
}
