'use server';

import { Job } from "@/app/lib/definitions/job";
import { getJobById } from "@query/job/data";
import NotificationSnackbar from "@ui/components/notificationSnackbar";

import DayJs from "dayjs";
import CrewRoleApplications from "@ui/myJobDetails/crewRoleApplications";
import { Suspense } from "react";
import ResultsLoading from "../components/resultsLoading";

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

/**
 * Formats the job start date to a human readable format.
 */
const getJobStart = (jobStart: string | undefined) => {
  if (jobStart) {
    return `${DayJs(jobStart).format('ddd MMM DD, YYYY')} - ${DayJs(jobStart).format('h:mm a')}`;
  }
  return 'No job start time provided.';
}

export default async function JobDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
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
      </div>
      <div className="w-full mb-2" />
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

      <div className="w-full my-4 border border-gray-700" />
      <Suspense fallback={<ResultsLoading />}>
        <CrewRoleApplications
          job={job}
        />
      </Suspense>
    </div>
  )
}

