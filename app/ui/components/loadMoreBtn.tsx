'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

function BtnWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center pt-4">
      <button className="bg-gray-300 text-dark-blue px-4 py-2 rounded-md">{children}</button>
    </div>
  );
}

export function LoadMoreBtn() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <BtnWrapper>
      <Link href={createPageURL(currentPage + 1)}>
        Load More
      </Link>
    </BtnWrapper>
  );
}

export function LoadPrevBtn() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <BtnWrapper>
      <Link href={createPageURL(currentPage - 1)}>
        Load Prev
      </Link>
    </BtnWrapper>
  );
}
