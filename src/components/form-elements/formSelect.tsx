"use client"

import { useState } from "react";
import Select from "react-select";

interface IFormOption {
  label: string
  value: string
}

interface IFormInputProps {
  label?: string;
  onChangeInput: (text: string) => void
  options: IFormOption[]
}

export default function FormSelect({
  label,
  onChangeInput,
  options
}: IFormInputProps) {
  const [selectedOption, setSelectedOption] = useState<IFormOption | null>(null);

  return (
    <div className="flex flex-col border border-gray-400 hover:border-gray-800 rounded-lg mt-2 mb-2">
      {label !== "" && (
        <div className="flex -my-4 ml-3">
          <label className="bg-gray-300 text-gray-400 pl-1 pr-1 text-sm">{label}</label>
        </div>
      )}

      <Select
        className={`${label !== "" ? "pt-4 pb-1" : ""} pl-3 pr-3 bg-transparent outline-none text-gray-700`}
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
            borderWidth: "1px",
            zIndex: 1000
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
        onChange={(option) => {
          setSelectedOption(option);
          onChangeInput(option?.value || "0");
        }}
        options={options}
      />
    </div>
  );
}
