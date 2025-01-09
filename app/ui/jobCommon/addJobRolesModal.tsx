import { Button, MenuItem, Modal, TextField } from "@mui/material";
import PageHeader from "../components/pageHeader";
import { initialCap } from "@lib/utils/textUtils";
import { CrewRole, CrewRoleOption } from "@definitions/job";
import JobRoleAssignmentRow from "./jobRoleAssignmentRow";
import { useEffect, useState } from "react";

interface AddJobRolesModalProps {
  open: boolean,
  onClickClose: () => void,
  onClickSave: () => void,
  crewRoles: CrewRole[]
}

export default function AddJobRolesModal({
  open,
  onClickClose,
  onClickSave,
  crewRoles
}: AddJobRolesModalProps) {

  const [selectedRoles, setSelectedRoles] = useState<CrewRole[]>([]);
  const [rolesToPick, setRolesToPick] = useState<CrewRoleOption[]>([]);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);

  /**
   * Initial data state
   */
  useEffect(() => {
    setRolesToPick(buildCrewRoleOptions());
  }, [crewRoles]);

  /**
   * Save button state
   */
  useEffect(() => {
    setSaveDisabled(selectedRoles.length === 0);
  }, [selectedRoles]);

  const handleClose = (e: React.MouseEvent<Element, MouseEvent>, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") {
      return;
    }
    onClickClose();
  }

  const moveRoleFromPickerToSelectedRoles = (id: string) => {
    const roleToAdd = crewRoles?.find((role) => role.id.toString() === id);
    if (roleToAdd) {
      setSelectedRoles([
        ...selectedRoles,
        {
          ...roleToAdd,
          count: 1
        }
      ]);
    }
    setRolesToPick(rolesToPick.filter((role) => role.value !== id));
  }

  const moveRoleFromSelectedRolesToPicker = (id: number) => {
    setSelectedRoles(selectedRoles.filter((role) => role.id !== id));
    setRolesToPick([
      ...rolesToPick,
      {
        label: initialCap(crewRoles?.find((role) => role.id === id)?.name || ""),
        value: id.toString()
      }
    ].sort((a, b) => Number(a.value) - Number(b.value)));
  }

  const buildCrewRoleOptions = () => {
    const options = crewRoles?.map((role) => (
      { label: initialCap(role.name), value: role.id.toString() } as CrewRoleOption
    )) || [];
    return options
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex h-full">
        <section className="flex flex-col flex-1 m-12 bg-blue border border-gray-200 p-4 rounded-lg">
          <PageHeader title="Add Job Roles" />
          <div className="flex flex-col flex-1 w-full gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4">
            <form>

              <TextField
                select
                label="Request Crew Role"
                className="w-full"
                value={""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => moveRoleFromPickerToSelectedRoles(e.target.value)}
              >
                {rolesToPick.map((role: CrewRoleOption) => {
                  return <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>
                })}
              </TextField>
            </form>

            {selectedRoles.map((role:CrewRole) => {
              return <JobRoleAssignmentRow
                key={role.id}
                role={role}
                removeRole={(id: number) => moveRoleFromSelectedRolesToPicker(id)}
              />
            })}
        </div>

        <div className="flex flex-row gap-4">
          <Button variant="contained" color="secondary" className="w-1/2" onClick={onClickClose}>Close</Button>
          <Button variant="contained" color="primary" className="w-1/2" disabled={saveDisabled} onClick={onClickSave}>Save Roles</Button>
        </div>
      </section>
     </div>

    </Modal>
  )
}