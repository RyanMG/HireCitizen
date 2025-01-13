'use client';

import { JobApplicant } from "@definitions/job";
import Dialog from "@components/dialog";
import Button from "@components/button";

import { toggleApplicationStatus } from "@query/jobRoles/actions";

import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState } from "react";


export default function ApplicationCard({ application }: { application: JobApplicant }) {

  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState<boolean>(false);
  const [pickerValue, setPickerValue] = useState<string>(application.acceptedStatus || "");
  const [hasStatusChangeError, setHasStatusChangeError] = useState<boolean>(false);

  const getDialogMessage = ():string => {
    switch (pickerValue) {
      case "PENDING":
        return "Confirm you want to mark this application as pending.";
      case "ACCEPTED":
        return "Confirm you want to accept this application.";
      case "REJECTED":
        return "Confirm you want to reject this application.";
    }

    return "Confirm you want to change the status of this application.";
  }

  return (
    <>
      <div className="flex flex-row justify-between bg-blue rounded mb-2 items-center">
        <Link className="p-2 w-40" href={`/profile/${application.person.id}?back=my-jobs/${application.jobId}`}>
          <p className="text-light-blue">{application.person.handle}</p>
        </Link>

        <div className="flex flex-1 flex-row justify-between w-full p-2">
          <p className="text-white">{application.crewRole.name}</p>
        </div>

        <div className="bg-light-blue w-28 sm:w-36 lg:w-48">
          <TextField
            id="applicationStatus"
            name="applicationStatus"
            select
            fullWidth
            variant="outlined"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPickerValue(e.target.value);
              setStatusChangeDialogOpen(true);
            }}
            value={pickerValue}
          >
            <MenuItem key="PENDING" value="PENDING">
              Pending
            </MenuItem>
            <MenuItem key="ACCEPTED" value="ACCEPTED">
              Accepted
            </MenuItem>
            <MenuItem key="REJECTED" value="REJECTED">
              Rejected
            </MenuItem>
          </TextField>
        </div>
      </div>
      {hasStatusChangeError && (
        <p className="text-red-500 text-sm">Error changing status</p>
      )}

      {statusChangeDialogOpen && (
        <Dialog>
          <p>{getDialogMessage()}</p>
          <div className="my-2 flex flex-row items-center justify-between">
            <form className="w-full" action={async () => {
                const resp = await toggleApplicationStatus(application.id, pickerValue);
                if (resp.submitted) {
                  setStatusChangeDialogOpen(false);
                }
                if (resp.error) {
                  setHasStatusChangeError(true);
                  setPickerValue(application.acceptedStatus || "");
                  setStatusChangeDialogOpen(false);
                }
            }}>
              <Button label="Change Status" theme="primary" type="submit" />
            </form>
            <Button label="Cancel" theme="primary" onClick={() => {
              setPickerValue(application.acceptedStatus || "");
              setStatusChangeDialogOpen(false);
            }} />
          </div>
        </Dialog>
      )}

    </>
  )
}
