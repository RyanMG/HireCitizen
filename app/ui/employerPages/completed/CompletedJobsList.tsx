import { getAllPastJobsJobs } from "@query/job/data";

export default async function CompletedJobsList() {
  const completedJobs = await getAllPastJobsJobs();

  if ('error' in completedJobs) {
    return <div>{completedJobs.error}</div>;
  }

  return (
    <div>
      {completedJobs.map((job) => (
        <div key={job.id}>
          <p>{job.title}</p>
        </div>
      ))}
    </div>
  )
}
