import { Job } from "@definitions/job";

export default function ActiveJobCard({ job }: {job: Job}) {
  return (
    <div>
      <p className="text-lg font-semibold text-white">{job.title}</p>
      <p className="text-sm text-gray-400">{job.description}</p>
    </div>
  )
}
