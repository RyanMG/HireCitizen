import { Job } from "@/app/lib/definitions/job";
import { getJobById } from "@/app/lib/query/job/data";

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
  // id: 'c338e8c5-bf5d-440d-a756-3b43ae8e2383',
  // owner_id: '282bd89c-f166-4e1a-b0d6-ec726775081b',
  // title: 'Seige of Orision',
  // description: 'Looking to run Siege today..',
  // job_type_id: 7,
  // status: 'ACTIVE',
  // created_at: 2025-01-01T04:05:20.983Z,
  // updated_at: 2025-01-01T04:05:20.983Z,
  // job_start: 2024-12-31T20:05:11.642Z,
  // timezone_id: 25,
  // estimated_time: 7,
  // amount_paid: 1000,
  // pay_type: 'PLAYER',
  // reputation_gate: false,
  // language_id: 1,
  // job_privacy: 'PUBLIC'

  return (
    <div className="flex flex-col bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
      <h1 className="text-white text-2xl font-bold mb-4">{job.title}</h1>
      <div className="flex flex-row">
        {/* <JobTypeIcon jobType={job.jobType}/> */}
        <p className="text-white text-lg">{job.description}</p>
      </div>
      <p className="text-white text-lg">{job.amountPaid} aUEC / {job.payType}</p>

    </div>
  )
}
