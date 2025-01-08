'use server';

import { getJobById, getJobTypeCategories } from "@query/job/data";
import { CreateJobFormState } from "@query/job/actions";
import dayjs from "dayjs";
import EditJobForm from "@ui/editJob/editJobForm";

export default async function EditJobFormWrapper(props: { params: Promise<{ id: string }> }) {
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
      <EditJobForm jobTypeCategories={jobTypeCategories} initialState={buildInitialFormState()} jobStartDate={job.jobStart || dayjs().toLocaleString()} jobId={job.id} />
    </>
  );
}

