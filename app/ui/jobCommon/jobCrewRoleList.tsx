import { Button } from "@mui/material";
import AddJobRolesModal from "./addJobRolesModal";
import { CrewRole, JobTypeCategory } from "@/app/lib/definitions/job";
import { useState } from "react";
import { saveJobRoles, removeJobRole } from "@/app/lib/query/job/actions";
import CloseIcon from "@components/iconBtns/closeIcon";

interface JobCrewRoleListProps {
  jobId: string;
  crewRoles: CrewRole[] | undefined;
  currentJobType: JobTypeCategory | null;
}
/**
 * Initial role list item
 */
const JobRoleListItem = ({ role, onClickRemove }: { role: CrewRole, onClickRemove: () => void }) => {
  return (
    <div className="flex flex-row items-center gap-4 border border-gray-600 bg-gray-300 p-2 rounded-lg">
      <div className="w-6">
        <CloseIcon
          onClickFn={onClickRemove}
          iconFillColor="#777"
        />
      </div>
      <p className="flex-1 text-gray-800 text-sm"><span className="font-bold text-gray-500">Role:</span> {role.name}</p>
      <p className="text-gray-800 text-sm"><span className="font-bold text-gray-500">Number requested:</span> {role.count}</p>
    </div>
  )
}

export default function JobCrewRoleList({
  jobId,
  crewRoles,
  currentJobType
}: JobCrewRoleListProps) {
  const [rolesModalOpen, setRolesModalOpen] = useState<boolean>(false);
  const [currentJobRoles, setCurrentJobRoles] = useState<CrewRole[]>(crewRoles || []);

  /**
   * Remove a role from the job
   */
  const removeRole = async (roleJoinId: number) => {
    const removeResp = await removeJobRole(roleJoinId);
    if ('error' in removeResp) {
      // @TODO handle error
      return;
    }

    setCurrentJobRoles(currentJobRoles.filter(r => r.id !== roleJoinId));
  }

  /**
   * Save updated job roles
   */
  const saveUpdatedJobRoles = async (selectedRoles: CrewRole[]) => {
    const saveResp = await saveJobRoles(jobId, selectedRoles);
    if ('error' in saveResp) {
      // @TODO handle error
      return;
    }
    console.log('saveResp', saveResp);
    setCurrentJobRoles([
      ...currentJobRoles,
      ...selectedRoles
    ]);
    // @TODO handle success
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {currentJobRoles?.map(role => (
          <JobRoleListItem
            key={role.id}
            role={role}
            onClickRemove={() => {
              removeRole(role.id);
            }}
          />
        ))}
      </div>

      <div className="w-full h-0 mt-4" />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => setRolesModalOpen(true)}
        className="w-full"
      >
        Add / Edit Job Roles
      </Button>

      <AddJobRolesModal
        open={rolesModalOpen}
        jobType={currentJobType}
        onClickClose={() => {
          setRolesModalOpen(false);
        }}
        onClickSave={(selectedRoles: CrewRole[]) => {
          setRolesModalOpen(false);
          saveUpdatedJobRoles(selectedRoles);
        }}
      />
    </>
  )
}
