'use server';

import { getCrewRoles, getJobTypeCategories } from "@/app/lib/query/job/data";

import { CreateJobFormState } from "@/app/lib/query/job/actions";
import dayjs from "dayjs";
import CreateJobForm from "./createJobForm";
import DataFetchErrorSnack from "@components/dataFetchErrorSnack";

export default async function CreateJobFormWrapper() {
  const [jobTypeCategories, crewRoles] = await Promise.all([
    getJobTypeCategories(),
    getCrewRoles()
  ]);

  if ('error' in jobTypeCategories || 'error' in crewRoles) {
    const messages: string[] = ['error' in jobTypeCategories ? jobTypeCategories.error : '', 'error' in crewRoles ? crewRoles.error : ''].filter(Boolean) as string[];
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
        crewRoles={crewRoles}
        initialState={buildInitialFormState()}
        jobStartDate={getJobStartDate()}
      />
    </>
  );
}
