'use client';

import { CrewRole, JobApplicant } from "@definitions/job";
import { Button, ButtonProps, styled } from "@mui/material";
import { useActionState, useEffect } from "react";
import { applyToCrewRole } from "@query/jobRoles/actions";

const getButtonText = (isApplied: boolean, appliedAny: boolean, acceptedStatus: string|null) => {
  if (isApplied && acceptedStatus === 'ACCEPTED') {
    return 'Accepted';
  } else if (isApplied && acceptedStatus === 'REJECTED') {
    return 'Rejected';
  } else if (isApplied) {
    return 'Applied';
  }

  return 'Apply';
}

const ApplicationButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&:disabled': {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[300],
  }
}));

export default function CrewRoleListing(props: {
  role: CrewRole,
  jobId: string,
  applications: JobApplicant[] | null,
  setHasApplied: (hasApplied: boolean) => void
}) {
  const {
    role,
    jobId,
    applications,
    setHasApplied,
  } = props;

  const [state, applyAction] = useActionState(applyToCrewRole.bind(null, jobId, role.id), { submitted: false, message: null, error: null });
  const thisApplication = applications?.find(application => application.crewRoleId === role.id);
  const isApplied = thisApplication !== undefined;
  const appliedAny = isApplied || Boolean(applications && applications?.length > 0);
  const showApplicationBtn = isApplied || !appliedAny;

  useEffect(() => {
    if (state.submitted) {
      setHasApplied(true);
    }
  }, [state, setHasApplied]);

  return (
    <form action={applyAction} className="flex flex-row justify-between bg-blue rounded-lg p-2 mb-2 items-center">
      <p className="text-white">{role.name} <span className="text-gray-400 text-sm pl-2">({role.count} {role.count === 1 ? 'spot' : 'spots'})</span></p>
      {showApplicationBtn &&
        <ApplicationButton
          variant="contained"
          size="small"
          type="submit"
          disabled={state.submitted || appliedAny}
        >
          {getButtonText(isApplied, appliedAny, thisApplication?.acceptedStatus || null)}
        </ApplicationButton>
      }
    </form>
  )
}
