'use server';

import { getCrewRoles, getJobById, getJobTypeCategories } from "@query/job/data";
import { CreateJobFormState } from "@query/job/actions";
import dayjs from "dayjs";
import EditJobForm from "@ui/editJob/editJobForm";
import DataFetchErrorSnack from "../components/dataFetchErrorSnack";

export default async function EditJobFormWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [job, jobTypeCategories, crewRoles] = await Promise.all([
    getJobById(params.id),
    getJobTypeCategories(),
    getCrewRoles()
  ]);

  if ('error' in jobTypeCategories || 'error' in crewRoles || 'error' in job) {
    const messages: string[] = ['error' in jobTypeCategories ? jobTypeCategories.error : '', 'error' in crewRoles ? crewRoles.error : '', 'error' in job ? job.error : ''].filter(Boolean) as string[];
    return <DataFetchErrorSnack messages={messages} />
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
      <EditJobForm
        jobTypeCategories={jobTypeCategories}
        crewRoles={crewRoles}
        initialState={buildInitialFormState()}
        jobStartDate={job.jobStart || dayjs().toLocaleString()}
        jobId={job.id}
      />
    </>
  );
}

