import PageHeader from "@components/pageHeader";
import Searchbar from "@components/searchbar";
import { Suspense } from "react";
import { neon } from '@neondatabase/serverless';

export default async function JobList() {
  const sql = neon(process.env.DATABASE_URL!);
  const jobs = await sql`SELECT * FROM language`;

  return (
    <div className="flex flex-col p-4 pr-7 h-full">
      <PageHeader title="Job Listings" />
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      <div className="flex flex-col gap-4 flex-1">
        {jobs.map((job) => (
          <div key={job.id}>{job.name}</div>
        ))}

      </div>
    </div>
  );
}
