import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { styled } from '@mui/material/styles'
import { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

interface IFormDatePickerProps {
  width?: string;
  label: string;
  value: Dayjs;
  onChangeInput: (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
}

const StyledTextField = styled(TextField)({
  borderWidth: '0',
  borderColor: '#transparent',
  backgroundColor: 'transparent',
  paddingTop: '1px'
});

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
