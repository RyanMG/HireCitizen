'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from '@mui/material/Button';

/**
 * Load more button.
 */
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
    <div className="flex justify-center mt-4">
      <Button variant="contained">
        <Link href={createPageURL(currentPage + 1)}>
          Load More
        </Link>
      </Button>
    </div>
  );
}

/**
 * Load previous button.
 */
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
    <div className="flex justify-center mt-4">
      <Button variant="contained">
        <Link href={createPageURL(currentPage - 1)}>
          Load Prev
        </Link>
      </Button>
    </div>
  );
}
