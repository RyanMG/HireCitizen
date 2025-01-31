'use client';

import JobForm from '@ui/employerPages/createJob/jobForm';
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useActionState } from "react";
import { createNewJob, CreateJobFormState } from '@/app/lib/query/job/actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { JobTypeCategory } from '@/app/lib/definitions/job';

export default function CreateJobForm({
  jobTypeCategories,
  initialState,
  jobStartDate,
}: {
  jobTypeCategories: JobTypeCategory[],
  initialState: CreateJobFormState,
  jobStartDate: string
}) {

  const [state, formAction] = useActionState(createNewJob, initialState);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        action={formAction}
        aria-describedby="form-error"
        className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mb-4 h-full overflow-auto"
      >
        <JobForm
          jobTypeCategories={jobTypeCategories}
          jobStartDate={jobStartDate}
          formState={state}
        />

        <Button
          variant="contained"
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
        {'saveResponse' in state && <p className="text-red-500">{state.saveResponse}</p>}
      </form>
    </LocalizationProvider>
  );
}
