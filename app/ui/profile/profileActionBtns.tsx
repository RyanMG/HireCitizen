'use client';

import Button from '@mui/material/Button';
import { redirect } from 'next/navigation';

export default function ProfileActionButtons() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outlined" color="primary" onClick={() => {
        redirect("/profile/edit");
      }}>
        Edit
      </Button>

      <Button variant="outlined" color="primary" onClick={() => {
        redirect("/profile/signout");
      }}>
        Sign Out
      </Button>
    </div>
  );
}
