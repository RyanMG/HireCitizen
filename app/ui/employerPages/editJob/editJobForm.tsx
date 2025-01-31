'use client';

import JobForm from '@ui/employerPages/createJob/jobForm';
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useActionState, useState } from "react";
import { CreateJobFormState, editJob } from '@/app/lib/query/job/actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TCrewRole, TJobTypeCategory } from '@definitions/job';
import JobCrewRoleList from '@ui/employerPages/addCrewRoles/jobCrewRoleList';

export default function EditJobForm({
  jobTypeCategories,
  initialState,
  jobStartDate,
  jobId,
  crewRoles
}: {
  jobTypeCategories: TJobTypeCategory[],
  initialState: CreateJobFormState,
  jobStartDate: string,
  jobId: string,
  crewRoles: TCrewRole[] | undefined
}) {
  const editJobAction = editJob.bind(null, jobId);
  const [state, formAction] = useActionState(editJobAction, initialState);

  const [currentJobType, setCurrentJobType] = useState<TJobTypeCategory | null>(jobTypeCategories.find(jobType => jobType.id === Number(initialState.prevState?.jobType)) || null);

  const onChangeJobType = (value: number) => {
    const jobType = jobTypeCategories.find(jobType => jobType.id === value) || null;
    setCurrentJobType(jobType);
  }

  return (
    <div className="flex flex-col bg-gray-300 p-4 rounded-lg mb-4 overflow-auto">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          action={formAction}
          aria-describedby="form-error"
          className="flex flex-col gap-3"
        >

          <JobForm
            jobTypeCategories={jobTypeCategories}
            jobStartDate={jobStartDate}
            formState={state}
            onChangeJobType={onChangeJobType}
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

      <div className="w-full h-0 border-b border-gray-900 mt-2 mb-6" />
      <JobCrewRoleList
        jobId={jobId}
        crewRoles={crewRoles}
        currentJobType={currentJobType}
      />

    </div>
  );
}
