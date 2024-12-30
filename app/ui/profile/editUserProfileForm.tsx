'use client';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { Session } from "next-auth";
import { useActionState, useState } from "react";

import FormWithErrorBlock from "@components/formWIthErrorBlock";
import ProfileImage from "@ui/profile/profileImage";

import { scrapeRSIDetails } from "@query/person/data";
import { GetUserRSIUrlFormState, updatePerson } from "@query/person/actions";

import { Timezone } from "@definitions/misc";
import { redirect } from "next/navigation";

export default function EditUserProfileForm({
  session,
  timezones
}: {
  session: Session|null,
  timezones: Timezone[]
}) {
  const initialState: GetUserRSIUrlFormState = { message: null, errors: {}, userDetails: { profileImage: "", handle: "", moniker: "" } };
  const [state, formAction] = useActionState(updatePerson, initialState);

  const [formSaving, setFormSaving] = useState<boolean>(false);

  const [rsiUrlError, setRsiUrlError] = useState<string | null>(null);

  return (
    <form action={formAction} onSubmit={() => {
       setFormSaving(true);
    }} className="flex flex-col gap-4 w-full">

      <FormWithErrorBlock error={state?.errors?.rsi_url || []}>
        <div className="flex flex-row gap-2">
          <TextField
            id="rsi_url"
            name="rsi_url"
            label="Enter your Spectrum account URL"
            placeholder="https://robertsspaceindustries.com/citizens/XXXXX"
            defaultValue={session?.activeUser?.rsi_url}
            size="small"
            className="flex-1"
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={async () => {
              const result = await scrapeRSIDetails(session?.activeUser?.rsi_url || '');
              if (result &&'error' in result) {
                setRsiUrlError(result.error);
                return;
              }
            }}
          >
            Verify
          </Button>
        </div>
        {rsiUrlError && <p className="text-red-500 text-xs">{rsiUrlError}</p>}
      </FormWithErrorBlock>

      <div className="flex flex-row gap-2">
        <FormWithErrorBlock error={state?.errors?.handle || []} halfWidth>
          <TextField
            id="handle"
            name="handle"
            label="Account Handle"
            size="small"
            disabled={state?.userDetails?.rsi_url === "" || !state?.userDetails?.rsi_url}
            defaultValue={session?.activeUser?.handle}
          />
        </FormWithErrorBlock>

        <FormWithErrorBlock error={state?.errors?.moniker || []} halfWidth>
          <TextField
            id="moniker"
            name="moniker"
            label="Spectrum Moniker"
            size="small"
            disabled={state?.userDetails?.rsi_url === "" || !state?.userDetails?.rsi_url}
            defaultValue={session?.activeUser?.moniker}
          />
        </FormWithErrorBlock>
      </div>

      <FormWithErrorBlock error={state?.errors?.profileImage || []}>
        <ProfileImage session={session} />
      </FormWithErrorBlock>

      <div className="flex flex-row gap-2">
        <FormWithErrorBlock error={state?.errors?.timezone || []} halfWidth>
          <TextField
            select
            id="timezone"
            name="timezone"
            label="Timezone"
            size="small"
            defaultValue={session?.activeUser?.timezone || 1}
          >
            {timezones
              .sort((a, b) => a.utc_offset - b.utc_offset)
              .map((timezone) => (
                <MenuItem key={timezone.id} value={timezone.id}>
                  {timezone.name}
                </MenuItem>
              ))}
          </TextField>
        </FormWithErrorBlock>

        <FormWithErrorBlock error={state?.errors?.language_id || []} halfWidth>
          <TextField
            select
            id="language_id"
            name="language_id"
            label="Language"
            size="small"
            defaultValue={session?.activeUser?.language?.code}
          >
            <MenuItem key={1} value={'EN'}>
              English
            </MenuItem>
          </TextField>
        </FormWithErrorBlock>
      </div>

      <div className="flex flex-col border border-gray-600 bg-gray-400 rounded-md p-2 gap-4">
        <p className="text-gray-800 text-xs italic mb-2">
          Email address and phone number are optional. Used if you want to receive notifications or reminders about upcoming jobs.
        </p>
        <FormWithErrorBlock error={state?.errors?.email || []}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            size="small"
            defaultValue={session?.activeUser?.email}
          />
        </FormWithErrorBlock>

        <FormWithErrorBlock error={state?.errors?.phone || []}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            size="small"
            defaultValue={session?.activeUser?.phone}
          />
        </FormWithErrorBlock>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" variant="contained" color="primary" className="w-1/2">
          {formSaving ? "Saving..." : "Save"}
        </Button>
        <Button variant="outlined" color="primary" className="w-1/2" onClick={() => {
          redirect("/profile");
        }}>
          Cancel
        </Button>
      </div>
    </form>
  );
}