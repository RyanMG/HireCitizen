'use client';

import Button from "@components/button";
import Dialog from "@components/dialog";

import { removeCrewMember } from "@query/jobRoles/actions";
import { useActionState, useEffect, useState } from "react";

export default function RemoveCrewMemberBtn({
  jobId,
  roleId,
  crewMemberId
}: {
  jobId: string,
  roleId: number,
  crewMemberId: string
}) {

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const removeCrewMemberAction = removeCrewMember.bind(null, jobId, roleId, crewMemberId);
  const [state, formAction] = useActionState(removeCrewMemberAction, {
    submitted: false,
    message: null,
    error: null
  });

  useEffect(() => {
    if (state.submitted) {
      setShowConfirmation(false);
    }
  }, [state.submitted]);

  return (
    <>
      <Button label="Remove" theme="destory" size="sm" onClick={() => setShowConfirmation(true)} />
      {showConfirmation && (
        <Dialog closeDialogFn={() => setShowConfirmation(false)}>
          <p className="pb-1 text-md">Are you sure you want to remove this citizen from the job?</p>
          <p className="pb-4 text-sm italic text-gray-500">Warning: removing citizens who you have previously accepted can negativly impact your employer reputation.</p>
          <div className="flex flex-row gap-2">
            <div className="w-1/2">
              <form action={formAction}>
                <Button label="Yes, remove" theme="primary" size="sm" type="submit"/>
              </form>
            </div>
            <div className="w-1/2">
              <Button label="No" theme="destory" size="sm" onClick={() => setShowConfirmation(false)} />
            </div>
          </div>
          {state.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}

        </Dialog>
      )}
    </>

  );
}
