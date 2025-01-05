'use client';

import { deleteJob } from "@/app/lib/query/job/actions";
import { Job } from "@definitions/job";
import Button from "@components/button";
import Dialog from "@components/dialog";

import { useActionState, useState } from "react";

export default function ActiveJobCard({ job }: {job: Job}) {
  const [state, deleteJobAction] = useActionState(deleteJob.bind(null, job.id), {message: null, error: null});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  console.log(state);

  return (
    <div className="bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col flex-1 mr-4">
          <p className="text-lg font-semibold text-white">{job.title}</p>
          <p className="text-sm text-gray-400">{job.description}</p>
        </div>
        <div className="flex flex-col justify-end w-28">
          <Button href={`/my-jobs/${job.id}/edit`} label="Edit Job" theme="primary" />
          <div className="my-1" />
          <Button label="Delete Job" theme="destory" onClick={() => {
            console.log('delete job');
            setDialogOpen(true);
          }} />
        </div>
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
