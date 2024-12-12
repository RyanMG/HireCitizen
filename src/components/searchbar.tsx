'use client'

interface ISearchbarProps {
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Searchbar({
  value,
  onInputChange,
  placeholder = "Search"
}: ISearchbarProps) {
  return (
    <div className="pt-4 pb-4">

      <div className="flex flex-row items-center">
        <div className="bg-gray-100 rounded-l-full border-l border-gray-300 w-8 h-11 flex justify-end items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f2937">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
        </div>

        <input className="bg-gray-100 w-full h-11 p-2 border-t border-b border-gray-300 text-gray-800 outline-none" type="text" onChange={onInputChange} placeholder={placeholder} value={value} />

        <div className="bg-gray-100 rounded-r-full border-r border-gray-300 w-8 h-11"></div>

      </div>
    </div>
  );
}