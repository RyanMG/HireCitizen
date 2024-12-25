interface IBackElementIconProps {
  onClickFn: () => void;
  iconFillColor?: string;
}

export default function BackElementIcon({
  onClickFn,
  iconFillColor = "#e8eaed"
}: IBackElementIconProps) {
  return (
    <div className="flex flex-row justify-start mr-3">
      <div className="border border-gray-300 rounded-full p-1" onClick={onClickFn}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={iconFillColor}>
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
        </svg>
      </div>
    </div>
  );
}
