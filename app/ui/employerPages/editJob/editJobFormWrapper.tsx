'use server';

import { getJobById, getJobTypeCategories } from "@query/job/data";
import { CreateJobFormState } from "@query/job/actions";
import dayjs from "dayjs";
import EditJobForm from "@ui/employerPages/editJob/editJobForm";
import NotificationSnackbar from "@components/notificationSnackbar";
import { auth } from "@/auth";
import { TPerson } from "@/app/lib/definitions/person";

export default async function EditJobFormWrapper(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  const user = session?.activeUser as TPerson;

  const [job, jobTypeCategories] = await Promise.all([
    getJobById(params.id),
    getJobTypeCategories(),
  ]);

  if ('error' in jobTypeCategories || 'error' in job) {
    const messages: string[] = ['error' in jobTypeCategories ? jobTypeCategories.error : '', 'error' in job ? job.error : ''].filter(Boolean) as string[];
    return <NotificationSnackbar
      type="error"
      messages={messages}
    />
  }

  if (user && job.owner.id !== user.id) {
    return <NotificationSnackbar
      type="error"
      messages={['You are not authorized to edit this job.']}
      redirectTo="/"
    />
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
        initialState={buildInitialFormState()}
        jobStartDate={job.jobStart || dayjs().toLocaleString()}
        jobId={job.id}
        crewRoles={job.crewRoles}
      />
    </>
  );
}

