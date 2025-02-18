'use client';

import { deleteJob, toggleJobActive } from "@query/job/actions";
import { TJob } from "@definitions/job";
import Button from "@components/button";
import Dialog from "@components/dialog";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getJobDateFormatted } from "@utils/dateUtils";

export default function ActiveJobCard({ job }: {job: TJob}) {
  const params = useSearchParams();

  const [state, deleteJobAction] = useActionState(deleteJob.bind(null, job.id), {message: null, error: null});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState<boolean>(false);

  const jobIsFullyPopulated = (job: TJob) => {
    return job.crewRoles && job.crewRoles.length > 0;
  }

  function jobButtonList() {
    switch (job.status) {
      case 'PENDING':
        const isFullyPopulated = jobIsFullyPopulated(job);
        return (
          <>
            <Button href={`/job/${job.id}/edit?back=jobs?jobStatus=${params.get('jobStatus')}`} label="Edit Job" theme="primary" />
            <div className="my-1" />
              <Button
                label={isFullyPopulated ? "Activate Job" : "Job is missing crew roles"}
                theme="primary"
                disabled={!isFullyPopulated}
                onClick={() => {
                  setActivateDialogOpen(true);
                }}
              />
            <div className="my-1" />
            <Button label="Delete Job" theme="destory" onClick={() => {
              setDeleteDialogOpen(true);
            }} />
          </>
        );
      case 'ACTIVE':
        return (
          <>
            <div className="my-1" />
            <Button
              label="Deactivate Job"
              theme="primary"
              onClick={() => {
                setActivateDialogOpen(true);
              }}
            />
            <div className="my-1" />
            <Button label="Delete Job" theme="destory" onClick={() => {
              setDeleteDialogOpen(true);
            }} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
        <div className="bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
          <div className="flex flex-row justify-between">

            <Link className="flex flex-col flex-1 gap-1 mr-4" href={`/job/${job.id}?back=posted-jobs?jobStatus=${params.get('jobStatus')}`}>
              <p className="text-lg font-semibold text-white">{job.title}</p>
              <p className="text-sm text-gray-400 italic">{job.description}</p>
              <p className="text-sm text-gray-400">Job starts: <span className="font-semibold text-gray-200">{getJobDateFormatted(job.jobStart)}</span></p>
            </Link>
            <div className="flex flex-col justify-end w-36">
              {jobButtonList()}
            </div>
            {'error' in state && <p className="text-red-500">{state.error}</p>}
          </div>
        </div>

      {deleteDialogOpen && (
        <Dialog>
          <p>Are you sure you want to delete this job?</p>
          <div className="my-2 flex flex-row items-center justify-between">
            <form action={deleteJobAction}>
              <Button label="Delete Job" theme="destory" type="submit" />
            </form>
            <Button label="Cancel" theme="primary" onClick={() => setDeleteDialogOpen(false)} />
          </div>
        </Dialog>
      )}

      {activateDialogOpen && (
        <Dialog>
          <p>Are you sure you want to activate this job?</p>
          <div className="my-2 flex flex-row items-center justify-between">
            <form className="w-full" action={() => {
              switch (job.status) {
                case 'PENDING':
                  toggleJobActive(job.id, true);
                  break;
                case 'ACTIVE':
                  toggleJobActive(job.id, false);
                  break;
              }
            }}>
              <Button label={job.status === 'PENDING' ? "Activate Job" : "Deactivate Job"} theme="primary" type="submit" />
            </form>
            <Button label="Cancel" theme="primary" onClick={() => setActivateDialogOpen(false)} />
          </div>
        </Dialog>
      )}
    </>
  )
}
