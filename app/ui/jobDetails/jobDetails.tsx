'use server';

import { Job } from "@definitions/job";
import { getJobById } from "@query/job/data";
import { getJobApplicationStatus } from "@query/jobRoles/data";
import CrewRoleList from "./crewRoleList";
import IconButton from "@ui/components/iconBtns/iconBtn";
import { auth } from "@/auth";

import DayJs from "dayjs";
import Link from "next/link";

/**
 * Formats the estimated time to a human readable format.
 */
const getEstimatedTime = (estimatedTime: number | undefined) => {
  if (estimatedTime) {
    const hours = Math.round(estimatedTime / 60);
    return hours > 1 ? `${hours} hours` : hours === 1 ? '1 hour' : `${hours} minutes`;
  }
  return '1 hour';
}

const getJobStart = (jobStart: string | undefined) => {
  if (jobStart) {
    return `${DayJs(jobStart).format('ddd MMM DD, YYYY')} - ${DayJs(jobStart).format('h:mm a')}`;
  }
  return 'No job start time provided.';
}

export default async function JobDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const session = await auth();
  const userId = session?.activeUser?.id || '';
  const job: Job | { message: string } = await getJobById(jobId);
  const applications = await getJobApplicationStatus(jobId, userId);

  if ('message' in job) {
    return (
      <div className="flex flex-col items-center justify-center pt-4">
        <p className="text-red-500">Error: {job.message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
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

      <Link href={`/profile/${job.owner.id}`} className="py-2">
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
          <p className="text-white text-lg">{getJobStart(job.jobStart)}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Estimated Time to Complete</p>
          <p className="text-white text-lg">{getEstimatedTime(job.estimatedTime)} </p>
        </div>
      </div>

      <CrewRoleList job={job} applications={applications} userId={userId} />
    </div>
  )
}
