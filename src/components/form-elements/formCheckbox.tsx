import Checkbox from '@mui/material/Checkbox';

interface IFormCheckbox {
  children: React.ReactNode;
  checked: boolean
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

export default function FormCheckbox({
  children,
  checked,
  onChangeInput
}: IFormCheckbox) {
  return (
    <div className="flex flex-row items-center -mt-2">
      <Checkbox
        checked={checked}
        onChange={onChangeInput}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          paddingLeft: 0,
        }}
      />
      {children}
    </div>
  )

}