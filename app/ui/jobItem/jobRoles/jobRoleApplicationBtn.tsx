'use client';

import { Button, ButtonProps, styled } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { applyToCrewRole, rescindCrewRoleApplication } from "@query/jobRoles/actions";
import { TCrewRole, TJobApplicant } from "@definitions/job"

const getButtonText = (currentApplication: TJobApplicant | null, isApplied: boolean) => {
  if (currentApplication && currentApplication.acceptedStatus === 'ACCEPTED') {
    return 'Accepted';
  } else if (currentApplication && currentApplication.acceptedStatus === 'REJECTED') {
    return 'Rejected';
  } else if (isApplied) {
    return 'Rescind Application';
  }

  return 'Apply';
}

const ApplicationButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&:disabled': {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[300],
  }
}));

export default function JobRoleApplicationBtn(props: {
  role: TCrewRole,
  jobId: string,
  currentApplication: TJobApplicant | null,
  updateApplication: (isApplied: boolean) => void
}) {

  const {
    role,
    jobId,
    currentApplication,
    updateApplication
  } = props;

  const [showApplicationBtn, setShowApplicationBtn] = useState<boolean>(false);
  const [state, applyAction] = useActionState(applyToCrewRole.bind(null, jobId, role.id), { submitted: false, message: null, error: null });
  const [rescindState, rescindAction] = useActionState(rescindCrewRoleApplication.bind(null, jobId, role.id), { submitted: false, message: null, error: null });
  const isApplied = Boolean(currentApplication && currentApplication.crewRole.id === role.id);

  useEffect(() => {
    setShowApplicationBtn(isApplied || currentApplication === null);
  }, [isApplied, currentApplication]);

  useEffect(() => {
    if (state.submitted) {
      updateApplication(true);
    }

    if (rescindState.submitted) {
      updateApplication(false);
    }
  }, [state, rescindState]);

  return (
    <>
      {showApplicationBtn &&
        <form action={() => {
          if (currentApplication) {
            rescindAction();
          } else {
            applyAction();
          }
        }}>
          <ApplicationButton
            variant="contained"
            size="small"
            type="submit"
            disabled={Boolean(currentApplication && (
              currentApplication.acceptedStatus === 'REJECTED' ||
             currentApplication.acceptedStatus === 'ACCEPTED'
            ))}
          >
            {getButtonText(currentApplication, isApplied)}
          </ApplicationButton>
        </form>
      }
    </>
  );
}
