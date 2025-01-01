import { Job } from "@/app/lib/definitions/job";
import { getJobById } from "@/app/lib/query/job/data";
import IconButton from "@ui/components/iconBtns/iconBtn";
import Button from "@mui/material/Button";
import Link from "next/link";

export default async function JobDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const jobId = params.id;
  const job: Job | { message: string } = await getJobById(jobId);

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
          <p className="text-white text-lg">{job.jobStart ? new Date(job.jobStart).toLocaleDateString() : ''} - {job.jobStart ? new Date(job.jobStart).toLocaleTimeString() : ''}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm italic">Estimated Time to Complete</p>
          <p className="text-white text-lg">{job.estimatedTime} hours</p>
        </div>
      </div>

      <h2 className="text-gray-400 text-lg font-bold mt-4 border-t border-gray-700 pt-4">Job Roles Available</h2>
      <div className="flex flex-col pt-4">
        <div className="flex flex-row justify-between bg-blue rounded-lg p-2 items-center">
          <p className="text-white">General / Any Role <span className="text-gray-400 text-sm pl-2">(2 spots)</span></p>
          <Button variant="contained" size="small">Apply</Button>
        </div>
      </div>
    </div>
  )
}
