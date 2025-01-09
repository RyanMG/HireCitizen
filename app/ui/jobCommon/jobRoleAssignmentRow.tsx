'use client';

import { useState } from "react";
import CloseElementIcon from "../components/iconBtns/closeIcon";
import { CrewRole } from "@definitions/job";

interface IJobRoleAssignmentRowProps {
  role: CrewRole;
  removeRole: (id: number) => void;
  updateRole: (id: number, count: number) => void;
}

export default function JobRoleAssignmentRow({
  role,
  removeRole,
  updateRole
}: IJobRoleAssignmentRowProps) {
  const [count, setCount] = useState(role.count);

  const increaseCount = () => {
    setCount(count + 1);
    updateRole(role.id, count + 1);
  }

  const decreaseCount = () => {
    setCount(count - 1);
    updateRole(role.id, count - 1);
  }

  return (
    <div className="flex flex-row justify-start items-center border border-b-gray-200 rounded-lg p-2">
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
