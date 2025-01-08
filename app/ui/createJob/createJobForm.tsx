'use server';

import { getJobTypeCategories } from "@/app/lib/query/job/data";
import JobForm from '@ui/jobCommon/jobForm';
import { CreateJobFormState } from "@/app/lib/query/job/actions";
import dayjs from "dayjs";

export default async function CreateJobForm() {
  const jobTypeCategories = await getJobTypeCategories();

  if ('message' in jobTypeCategories) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{jobTypeCategories.message}</p>;
  }

  const getJobStartDate = () => {
    const now = dayjs();
    return dayjs(`${now.month() + 1}-${now.date()}-${now.year()} 18:00:00.000`).add(1, 'day').toLocaleString();
  }

  const buildInitialFormState = (): CreateJobFormState => {
    return { saveResponse: null, errors: {}, prevState: {} };
  }

  return (
    <>
      <JobForm jobTypeCategories={jobTypeCategories} initialState={buildInitialFormState()} jobStartDate={getJobStartDate()} />
    </>
  );
}
