interface IFormInputProps {
  label?: string;
  formValue: string | number | undefined
  type?: "text" | "number"
  width?: string
  onChangeInput?: (text: string) => void
  maxLength?: number
  disabled?: boolean
  textarea?: boolean
}

export default function FormInput({
  label,
  formValue,
  type = "text",
  width = "100",
  onChangeInput,
  maxLength = 50,
  disabled = false,
  textarea = false
}: IFormInputProps) {
  return (
    <div className={`flex flex-col border border-gray-800 rounded-lg mt-2 mb-2 ${width === "50" ? "w-1/2" : "w-full"}`}>
      <div className="flex -my-4 ml-3">
        <label className="bg-gray-300 text-gray-400 pl-1 pr-1 text-sm">{label}</label>
      </div>
      {textarea ? (
        <textarea
          className="pt-5 pb-2 pl-3 pr-3 bg-transparent outline-none text-gray-700"
          rows={5}
          value={formValue}
          maxLength={maxLength}
          disabled={disabled}
          onChange={(e) => onChangeInput?.(e.target.value)}
        />
      ) : (
        <input
          className="pt-5 pb-2 pl-3 pr-3 bg-transparent outline-none text-gray-700"
          type={type}
          value={formValue}
          disabled={disabled}
          onChange={(e) => onChangeInput?.(e.target.value)}
        />
      )}
    </div>
  );
}
