'use client';

import { JobApplicant } from "@/app/lib/definitions/job";
import Link from "next/link";

export default function ApplicationCard({ application }: { application: JobApplicant }) {

  return (
    <div className="flex flex-row justify-between bg-blue rounded p-2 mb-2 items-center">
      <Link href={`/profile/${application.person.id}?back=my-jobs/${application.jobId}`}>
        <p className="text-white">{application.person.handle}</p>
      </Link>
      <p className="text-white">{application.crewRole.name}</p>
      <p className="text-white">{application.acceptedStatus}</p>
    </div>
  )
}
