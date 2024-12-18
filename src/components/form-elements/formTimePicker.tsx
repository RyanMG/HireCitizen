import { PickerChangeHandlerContext, TimePicker, TimeValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

interface IFormTimePickerProps {
  width?: string;
  label: string;
  value: Dayjs;
  onChangeInput: (value: Dayjs | null, context: PickerChangeHandlerContext<TimeValidationError>) => void;
}

export default function FormTimePicker({
  label,
  value,
  onChangeInput
}: IFormTimePickerProps) {
  return (
    <TimePicker
      label={label}
      value={value}
      onChange={onChangeInput}
      referenceDate={dayjs('2022-04-17')}
    />
  )
}
