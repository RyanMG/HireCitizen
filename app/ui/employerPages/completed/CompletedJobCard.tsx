'use client';

import { useState, useActionState, useEffect } from "react";
import { TJob } from "@definitions/job";
import { getJobDateFormatted } from "@utils/dateUtils";
import Link from "next/link";
import Button from '@components/button';
import Dialog from '@components/dialog'
import { markJobComplete } from "@query/job/actions";
import { useSearchParams } from "next/navigation";

export default function CompletedJobCard({ job }: { job: TJob }) {
  const searchParams = useSearchParams();

  const [completeJobDialogOpen, setCompleteJobDialogOpen] = useState<boolean>(false);
  const [state, completeJobAction] = useActionState(markJobComplete.bind(null, job.id), { success: false });

  useEffect(() => {
    if (state.success) {
      setCompleteJobDialogOpen(false);
    }
  }, [state]);

  return (
    <>
        <div className="bg-dark-blue border border-gray-400 rounded-xl my-4 p-4">
          <div className="flex flex-row justify-between">

            <Link className="flex flex-col flex-1 gap-1 mr-4" href={`/job/${job.id}?back=completed-jobs?jobStatus=${searchParams.get('jobStatus')}`}>
              <p className="text-lg font-semibold text-white">{job.title}</p>
              <p className="text-sm text-gray-400 italic">{job.description}</p>
              <p className="text-sm text-gray-400">Job starts: <span className="font-semibold text-gray-200">{getJobDateFormatted(job.jobStart)}</span></p>
            </Link>
            <div className="flex flex-col justify-center items-center w-36">
              {job.status === 'ACTIVE' &&
                <div>
                  <Button label="Mark Complete" theme="secondary" onClick={() =>  setCompleteJobDialogOpen(true)} />
                </div>
              }
            </div>
          </div>
          {'error' in state && <p className="text-red-500">{state.error}</p>}
        </div>

      {completeJobDialogOpen && (
        <Dialog>
          <p>TODO: Make owner do job feedback</p>
          <div className="my-2 flex flex-row items-center justify-between">
            <form action={completeJobAction}>
              <Button label="Mark Complete" theme="destory" type="submit" />
            </form>
            <Button label="Cancel" theme="primary" onClick={() => setCompleteJobDialogOpen(false)} />
          </div>
        </Dialog>
      )}
    </>
  )
}
