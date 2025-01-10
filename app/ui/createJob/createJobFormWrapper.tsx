'use server';

import { getJobTypeCategories } from "@/app/lib/query/job/data";

import { CreateJobFormState } from "@/app/lib/query/job/actions";
import dayjs from "dayjs";
import CreateJobForm from "./createJobForm";
import DataFetchErrorSnack from "@components/dataFetchErrorSnack";

export default async function CreateJobFormWrapper() {
  const jobTypeCategories = await getJobTypeCategories();

  if ('error' in jobTypeCategories) {
    const messages: string[] = ['error' in jobTypeCategories ? jobTypeCategories.error : ''].filter(Boolean) as string[];
    return <DataFetchErrorSnack messages={messages} />
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
      <CreateJobForm
        jobTypeCategories={jobTypeCategories}
        initialState={buildInitialFormState()}
        jobStartDate={getJobStartDate()}
      />
    </>
  );
}
