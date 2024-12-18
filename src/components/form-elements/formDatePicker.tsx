import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface IFormDatePickerProps {
  width?: string;
  label: string;
  value: Dayjs;
  onChangeInput: (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
}

export default function FormDatePicker({
  value,
  label,
  onChangeInput
}: IFormDatePickerProps) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChangeInput}
      className="border border-gray-800 hover:border-gray-800 rounded-lg"
    />
  )
}
