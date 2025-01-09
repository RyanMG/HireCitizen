'use client';

import JobForm from '@ui/jobCommon/jobForm';
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useActionState, useState } from "react";
import { CreateJobFormState, editJob } from '@/app/lib/query/job/actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CrewRole, JobTypeCategory } from '@/app/lib/definitions/job';
import AddJobRolesModal from '../jobCommon/addJobRolesModal';

export default function EditJobForm({
  jobTypeCategories,
  initialState,
  jobStartDate,
  jobId,
  crewRoles
}: {
  jobTypeCategories: JobTypeCategory[],
  initialState: CreateJobFormState,
  jobStartDate: string,
  jobId: string,
  crewRoles: CrewRole[]
}) {
  const editJobAction = editJob.bind(null, jobId);
  const [state, formAction] = useActionState(editJobAction, initialState);
  const [rolesModalOpen, setRolesModalOpen] = useState<boolean>(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          action={formAction}
          aria-describedby="form-error"
          className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full overflow-auto"
        >

          <JobForm jobTypeCategories={jobTypeCategories} jobStartDate={jobStartDate} formState={state} />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              console.log('Add / Edit Job Roles');
            }}
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
        crewRoles={crewRoles}
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
