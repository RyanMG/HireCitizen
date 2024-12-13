"use client"

import { useState } from "react";
import Select from "react-select";

interface IFormOption {
  label: string
  value: string
}

interface IFormInputProps {
  label?: string;
  formValue: string | undefined
  onChangeInput?: (text: string) => void
  disabled?: boolean
  options: IFormOption[]
}

export default function FormSelect({
  label,
  formValue,
  onChangeInput,
  disabled = false,
  options
}: IFormInputProps) {
  const [selectedOption, setSelectedOption] = useState<IFormOption | null>(formValue);

  return (
    <div className="flex flex-col border border-gray-800 rounded-lg mt-2 mb-2">
      {label !== "" && (
        <div className="flex -my-4 ml-3">
          <label className="bg-gray-300 text-gray-400 pl-1 pr-1 text-sm">{label}</label>
        </div>
      )}

      <Select
        className={`${label !== "" ? "pt-5 pb-2" : ""} pl-3 pr-3 bg-transparent outline-none text-gray-700`}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: "none !important",
            "*": {
              boxShadow: "none !important",
            },
            "&:hover": {
              border: "none"
            },
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: "#999999"
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#DDDDDD",
            width: "95%",
            borderColor: "#BBB",
            borderWidth: "1px"
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#DDDDDD",
            color: "#444444",
            "&:hover": {
              backgroundColor: "#d4ac2a"
            },
          })
        }}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
