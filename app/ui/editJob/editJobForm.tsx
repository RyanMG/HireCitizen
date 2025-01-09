'use client';

import JobForm from '@ui/jobCommon/jobForm';
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useActionState, useState } from "react";
import { CreateJobFormState, editJob } from '@/app/lib/query/job/actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { JobTypeCategory } from '@/app/lib/definitions/job';
import AddJobRolesModal from '../jobCommon/addJobRolesModal';

export default function EditJobForm({
  jobTypeCategories,
  initialState,
  jobStartDate,
  jobId
}: {
  jobTypeCategories: JobTypeCategory[],
  initialState: CreateJobFormState,
  jobStartDate: string,
  jobId: string
}) {
  const editJobAction = editJob.bind(null, jobId);
  const [state, formAction] = useActionState(editJobAction, initialState);
  const [rolesModalOpen, setRolesModalOpen] = useState<boolean>(false);
  const [currentJobType, setCurrentJobType] = useState<JobTypeCategory | null>(jobTypeCategories.find(jobType => jobType.id === Number(initialState.prevState?.jobType)) || null);

  const onChangeJobType = (value: number) => {
    const jobType = jobTypeCategories.find(jobType => jobType.id === value) || null;
    setCurrentJobType(jobType);
  }

  const showAddJobRolesModal = () => {
    setRolesModalOpen(true);
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          action={formAction}
          aria-describedby="form-error"
          className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full overflow-auto"
        >

          <JobForm
            jobTypeCategories={jobTypeCategories}
            jobStartDate={jobStartDate}
            formState={state}
            onChangeJobType={onChangeJobType}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={showAddJobRolesModal}
            className="w-full"
          >
            Add / Edit Job Roles
          </Button>

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
      <AddJobRolesModal
        open={rolesModalOpen}
        jobType={currentJobType}
        onClickClose={() => {
          setRolesModalOpen(false);
        }}
        onClickSave={() => {
          setRolesModalOpen(false);
        }}
      />
    </>
  );
}
