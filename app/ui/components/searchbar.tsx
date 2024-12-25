'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface ISearchbarProps {
  placeholder?: string;
}

export default function Searchbar({
  placeholder = "Search"
}: ISearchbarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) params.set('query', term)
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="pt-4 pb-4">

      <div className="flex flex-row items-center">
        <div className="bg-gray-100 rounded-l-full border-l border-gray-300 w-8 h-11 flex justify-end items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f2937">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
        </div>

        <input
          className="bg-gray-100 w-full h-11 p-2 border-t border-b border-gray-100 text-gray-800 focus:border-gray-100 focus:outline-none focus:ring-offset-transparent focus:ring-opacity-0 focus:ring-transparent"
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />

        <div className="bg-gray-100 rounded-r-full border-r border-gray-300 w-8 h-11"></div>

      </div>
    </div>
  );
}
