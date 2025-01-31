'use client';

import { Chip } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const JOB_PENDING = 'PENDING';
const JOB_ACTIVE = 'ACTIVE';
const JOB_CANCELLED = 'CANCELLED';

export default function MyJobFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pending, setPending] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  /**
   * Update all filter states
   */
  const setFilterState = (filters: string[]) => {
    setPending(filters.includes(JOB_PENDING));
    setActive(filters.includes(JOB_ACTIVE));
    setCancelled(filters.includes(JOB_CANCELLED));
  }

  /**
   * Initial state
   */
  useEffect(() => {
    const filters = searchParams.get('jobStatus')?.split(',') || [];
    setFilterState(filters);
  }, [searchParams]);

  /**
   * Click handler
   */
  const handleFilterClick = (filterName: string) => {
    const params = new URLSearchParams(searchParams);
    let filters = params.get('jobStatus')?.split(',') || [];

    if (filters.includes(filterName)) {
      filters = filters.filter(filter => filter !== filterName);
    } else {
      filters.push(filterName);
    }

    if (filters.length > 0) params.set('jobStatus', filters.join(','))
    else params.delete('jobStatus');

    setFilterState(filters);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-row gap-2 mb-4">
      <Chip label="Pending Jobs" color="warning" variant={pending ? 'filled' : 'outlined'} onClick={() => handleFilterClick(JOB_PENDING)} />
      <Chip label="Active Jobs" color="warning" variant={active ? 'filled' : 'outlined'} onClick={() => handleFilterClick(JOB_ACTIVE)} />
      <Chip label="Cancelled Jobs" color="warning" variant={cancelled ? 'filled' : 'outlined'} onClick={() => handleFilterClick(JOB_CANCELLED)} />
    </div>
  );
}
