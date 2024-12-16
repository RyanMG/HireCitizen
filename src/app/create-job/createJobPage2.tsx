import { FormData } from "@/types/Forms";
import { CrewRole } from "@/types/Job";
import FormSelect from "@/components/form-elements/formSelect";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCrewRoleOptions } from "@/api/jobApi";
import initialCap from "@/utils/initialCap";
import Button from "@/components/form-elements/button";
import CloseElementIcon from "@/components/closeElementIcon";

interface ICreateJobPage2Props {
  formData: FormData,
  setFormData: (formData: FormData) => void
}

type CrewOption = {
  label: string;
  value: string;
}

const CrewRoleAssignmentRow = ({
  role,
  removeRole
}: { role: CrewRole, removeRole: (id: number) => void }) => {
  const [count, setCount] = useState(role.count);

  const increaseCount = () => {
    setCount(count + 1);
    role.count++;
  }

  const decreaseCount = () => {
    setCount(count - 1);
    role.count--;
  }

  return (
    <div className="flex flex-row justify-start items-center">
      <CloseElementIcon
        iconFillColor="#444"
        onClickFn={() => removeRole(role.id)}
      />
      <div className="flex-1 pl-2 pr-2">
        <div className="text-base text-gray-700 font-semibold">{role.name}</div>
      </div>
      <div className="flex flex-row items-center pl-2 pr-2">
        <div className={`select-none cursor-pointer text-lg text-gray-700 font-semibold border border-gray-700 rounded-md px-2 ${count === 1 ? "bg-gray-500" : "bg-gray-300"}`} onClick={decreaseCount}>-</div>
        <div className="select-none text-base text-gray-700 font-semibold pl-2 pr-2">{count}</div>
        <div className={`select-none cursor-pointer text-lg text-gray-700 font-semibold border border-gray-700 rounded-md bg-gray-300 px-2`} onClick={increaseCount}>+</div>
      </div>
    </div>
  )
}

export default function CreateJobPage2({
  formData,
  setFormData,
}: ICreateJobPage2Props) {
  const [selectedRoles, setSelectedRoles] = useState<CrewRole[]>([]);
  const [rolesToPick, setRolesToPick] = useState<CrewOption[]>([]);

  const { data: crewRolesData, isLoading, error } = useQuery({
    queryKey: [`crew-roles`],
    queryFn: () => getCrewRoleOptions()
  });

  const validateForm = () => {
    if (selectedRoles.length === 0) {
      alert("Please select a crew role");
      return;
    }

    setFormData({
      ...formData,
      crewRoles: selectedRoles
    });
  }

  useEffect(() => {
    if (crewRolesData) {
      setRolesToPick(buildCrewRoleOptions());
    }
  }, [crewRolesData]);

  const buildCrewRoleOptions = () => {
    const options = crewRolesData?.map((role) => (
      { label: initialCap(role.name), value: role.id.toString() } as CrewOption
    )) || [];
    options.unshift({ label: "Select Crew Role", value: "0" });
    return options
  }

  const moveRoleFromPickerToSelectedRoles = (id: string) => {
    const roleToAdd = crewRolesData?.find((role) => role.id.toString() === id);
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
        label: initialCap(crewRolesData?.find((role) => role.id === id)?.name || ""),
        value: id.toString()
      }
    ].sort((a, b) => Number(a.value) - Number(b.value)));
  }

  return (
    <div>
      <form className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full">
        <FormSelect
          label="Request Crew Role"
          onChangeInput={(value: string) => moveRoleFromPickerToSelectedRoles(value)}
          options={rolesToPick}
        />

        {selectedRoles.map((role:CrewRole) => {
          return <CrewRoleAssignmentRow
            key={role.id}
            role={role}
            removeRole={(id: number) => moveRoleFromSelectedRolesToPicker(id)}
          />
        })}

        <Button
          label="Create Job"
          onClick={validateForm}
          theme="primary"
        />

      </form>
    </div>
  );
}
