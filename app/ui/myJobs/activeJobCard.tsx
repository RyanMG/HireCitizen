'use client';

import { deleteJob } from "@/app/lib/query/job/actions";
import { Job } from "@definitions/job";
import Button from "@components/button";
import Dialog from "@components/dialog";

import { useActionState, useState } from "react";

export default function ActiveJobCard({ job }: {job: Job}) {
  const [state, deleteJobAction] = useActionState(deleteJob.bind(null, job.id), {message: null, error: null});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const jobIsFullyPopulated = (job: Job) => {
    return job.crewRoles && job.crewRoles.length > 0;
  }

  function jobButtonList() {
    switch (job.status) {
      case 'PENDING':
        const isFullyPopulated = jobIsFullyPopulated(job);
        return (
          <>
            <Button href={`/my-jobs/${job.id}/edit`} label="Edit Job" theme="primary" />
            <div className="my-1" />
            <Button
              label={isFullyPopulated ? "Activate Job" : "Job is missing crew roles"}
              theme="primary"
              disabled={!isFullyPopulated}
              onClick={() => {}} />
            <div className="my-1" />
            <Button label="Delete Job" theme="destory" onClick={() => {
              setDialogOpen(true);
            }} />
          </>
        );
      case 'ACTIVE':
        return (
          <>
            <div className="my-1" />
            <Button label="Deactivate Job" theme="primary" onClick={() => {}} />
            <div className="my-1" />
            <Button label="Delete Job" theme="destory" onClick={() => {
              setDialogOpen(true);
            }} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col flex-1 mr-4">
          <p className="text-lg font-semibold text-white">{job.title}</p>
          <p className="text-sm text-gray-400">{job.description}</p>
        </div>
        <div className="flex flex-col justify-end w-36">
          {jobButtonList()}
        </div>
        {'error' in state && <p className="text-red-500">{state.error}</p>}
      </div>

      {dialogOpen && (
        <Dialog>
          <p>Are you sure you want to delete this job?</p>
          <div className="my-2 flex flex-row items-center justify-between">
            <form action={deleteJobAction}>
              <Button label="Delete Job" theme="destory" />
            </form>
            <Button label="Cancel" theme="primary" onClick={() => setDialogOpen(false)} />
          </div>
        </Dialog>
      )}

    </div>
  )
}
