'use server';

import JobForm from "@ui/jobCommon/jobForm";
import { getJobById, getJobTypeCategories } from "@/app/lib/query/job/data";
import dayjs from "dayjs";
import { CreateJobFormState } from "@/app/lib/query/job/actions";

export default async function EditJobForm(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const job = await getJobById(params.id);
  const jobTypeCategories = await getJobTypeCategories();

  if ('message' in jobTypeCategories) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{jobTypeCategories.message}</p>;
  }

  if ('message' in job) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{job.message}</p>;
  }

  const buildInitialFormState = (): CreateJobFormState => {
    const initialState: CreateJobFormState = { saveResponse: null, errors: {}, prevState: {} };

    if (job) {
      initialState.prevState = {
        jobTitle: job.title,
        jobType: job.jobType.id.toString(),
        jobDescription: job.description,
        jobDate: job.jobStart,
        jobEstimatedTime: job.estimatedTime?.toString(),
        jobPrivacy: job.jobPrivacy,
        jobReputationGate: job.jobReputationGate
      } as CreateJobFormState['prevState'];
    }

    return initialState;
  }

  return (
    <>
      <JobForm jobTypeCategories={jobTypeCategories} initialState={buildInitialFormState()} jobStartDate={job.jobStart || dayjs().toLocaleString()} />
    </>
  )
}
