'use server';

import { getActiveJobs } from "@query/job/data";
import ActiveJobCard from "./activeJobCard";

export default async function ActiveJobsList() {
  const jobs = await getActiveJobs();
  if ('error' in jobs) {
    return <div>{jobs.error}</div>;
  }

  return (
    <div>
      {jobs.map(job => <ActiveJobCard job={job} key={job.id} />)}
    </div>
  );
}
