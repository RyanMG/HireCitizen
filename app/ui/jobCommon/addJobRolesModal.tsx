import { Button, MenuItem, Modal, TextField } from "@mui/material";
import PageHeader from "../components/pageHeader";
import { initialCap } from "@lib/utils/textUtils";
import { CrewRole, CrewRoleOption, JobTypeCategory } from "@definitions/job";
import JobRoleAssignmentRow from "./jobRoleAssignmentRow";
import { useEffect, useRef, useState } from "react";
import { getCrewRoles } from "@/app/lib/query/job/data";
import DataFetchErrorSnack from "../components/dataFetchErrorSnack";
import ResultsLoading from "../components/resultsLoading";

interface AddJobRolesModalProps {
  open: boolean,
  onClickClose: () => void,
  onClickSave: () => void,
  jobType: JobTypeCategory | null
}

export default function AddJobRolesModal({
  open,
  onClickClose,
  onClickSave,
  jobType
}: AddJobRolesModalProps) {

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoles, setSelectedRoles] = useState<CrewRole[]>([]);
  const [rolesToPick, setRolesToPick] = useState<CrewRoleOption[]>([]);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);

  const crewRolesRef = useRef<CrewRole[]>([]);
  /**
   * Initial data state
   */
  useEffect(() => {
    const fetchCrewRoles = async () => {
      const crewRoles = await getCrewRoles(jobType?.id || 0);
      if ('error' in crewRoles) {
        return <DataFetchErrorSnack messages={[crewRoles.error]} />
      }
      crewRolesRef.current = crewRoles.sort((a, b) => a.name.localeCompare(b.name));
      setRolesToPick(buildCrewRoleOptions());
      setLoading(false);
    }
    fetchCrewRoles();
  }, [jobType]);

  /**
   * Save button state
   */
  useEffect(() => {
    setSaveDisabled(selectedRoles.length === 0);
  }, [selectedRoles]);

  /**
   * Close modal
   */
  const handleClose = (e: React.MouseEvent<Element, MouseEvent>, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") {
      return;
    }
    onClickClose();
  }

  /**
   * Move role from picker to selected roles
   */
  const moveRoleFromPickerToSelectedRoles = (id: string) => {
    const roleToAdd = crewRolesRef.current?.find((role) => role.id.toString() === id);
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

  /**
   * Move role from selected roles to picker
   */
  const moveRoleFromSelectedRolesToPicker = (id: number) => {
    setSelectedRoles(selectedRoles.filter((role) => role.id !== id));
    setRolesToPick([
      ...rolesToPick,
      {
        label: initialCap(crewRolesRef.current?.find((role) => role.id === id)?.name || ""),
        value: id.toString()
      }
    ].sort((a, b) => Number(a.value) - Number(b.value)));
  }

  /**
   * Build crew role options
   */
  const buildCrewRoleOptions = () => {
    const options = crewRolesRef.current?.map((role) => (
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
          <PageHeader title={`Add Job Roles (${initialCap(jobType?.name || "")})`} />
          {loading &&
            <div className="flex flex-col flex-1 w-full gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4">
              <ResultsLoading />
            </div>
          }
          {!loading &&
            <>
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
            </>
          }
        </section>
      </div>
    </Modal>
  )
}