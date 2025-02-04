'use client';

import Button from "@components/button";
import Dialog from "@components/dialog";

import { rescindCrewRoleApplication } from "@query/jobRoles/actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function RemoveSelfFromJobBtn({
  jobId,
  roleId
}: {
  jobId: string,
  roleId: number
}) {
  const router = useRouter();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const removeSelfFromJobAction = rescindCrewRoleApplication.bind(null, jobId, roleId);
  const [state, formAction] = useActionState(removeSelfFromJobAction, {
    submitted: false,
    message: null,
    error: null
  });

  useEffect(() => {
    if (state.submitted) {
      setShowConfirmation(false);
      router.push('/');
    }
  }, [state.submitted, router]);

  return (
    <>
      <Button label="Leave Job" theme="destory" size="sm" onClick={() => setShowConfirmation(true)} />
      {showConfirmation && (
        <Dialog closeDialogFn={() => setShowConfirmation(false)}>
          <p className="pb-4 text-md">Are you sure you want to leave this job?</p>
          <div className="flex flex-row gap-2">
            <form action={formAction}>
              <Button label="Yes, leave job" theme="primary" size="sm" type="submit"/>
            </form>

            <Button label="No, stay on job" theme="destory" size="sm" onClick={() => setShowConfirmation(false)} />
          </div>
          {state.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}

        </Dialog>
      )}
    </>

  );
}
