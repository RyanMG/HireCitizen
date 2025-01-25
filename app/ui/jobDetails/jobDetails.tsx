'use server';

import { Job } from "@/app/lib/definitions/job";
import { getJobById } from "@query/job/data";
import CrewRoleList from "./crewRoleList";
import IconButton from "@ui/components/iconBtns/iconBtn";
import { auth } from "@/auth";
import NotificationSnackbar from "@ui/components/notificationSnackbar";

import Link from "next/link";
import { getJobDateFormatted, getEstimatedTime } from "@/app/lib/utils/dateUtils";

export default async function JobDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const session = await auth();
  const job: Job | { error: string } = await getJobById(jobId);

  if ('error' in job) {
    return (
      <NotificationSnackbar
        type="error"
        messages={[job.error]}
      />
    )
  }

  return (
    <div className="flex flex-col bg-dark-blue border border-gray-400 rounded-xl mb-4 p-4">
      <div className="flex flex-row justify-between bg-blue border border-gray-700 rounded-md px-2 py-1 mb-2">
        <h1 className="flex items-center text-white text-2xl font-bold pl-1">{job.title}</h1>
        <div className="flex flex-row">
          <IconButton
            type={"bookmark"}
            selected={job.isBookmarked || false}
            jobId={job.id}
          />
          <IconButton
            type={"flag"}
            selected={job.isFlagged || false}
            jobId={job.id}
          />
        </div>
      </div>

      <Link href={`/profile/${job.owner.id}?back=job-search/job/${job.id}`} className="py-2">
        <p className="text-gray-400 text-sm italic">Job Owner</p>
        <p className="text-light-blue text-lg font-bold not-italic">{job.owner.moniker}</p>
      </Link>

      <div className="flex flex-col">
        <p className="text-gray-400 text-sm italic">Description</p>
        <p className="text-white text-lg">{job.description}</p>
      </div>

      <div className="flex flex-row justify-between py-2">
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Job Start Date</p>
          <p className="text-white text-lg">{getJobDateFormatted(job.jobStart)}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Estimated Time to Complete</p>
          <p className="text-white text-lg">{getEstimatedTime(job.estimatedTime)} </p>
        </div>
      </div>

      {session?.activeUser && (
        <CrewRoleList job={job} user={session?.activeUser} />
      )}

    </div>
  )
}
