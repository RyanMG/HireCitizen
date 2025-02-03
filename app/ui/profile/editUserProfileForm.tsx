'use client';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { Session } from "next-auth";
import { useActionState, useState, useRef, useEffect } from "react";

import FormWithErrorBlock from "@components/formWithErrorBlock";
import ProfileImage from "@/app/ui/profile/components/profileImage";

import { scrapeRSIDetails } from "@query/person/data";
import { GetUserRSIUrlFormState, updatePerson } from "@query/person/actions";

import { TTimezone } from "@definitions/misc";
import { redirect } from "next/navigation";

export default function EditUserProfileForm({
  session,
  timezones
}: {
  session: Session|null,
  timezones: TTimezone[]
}) {
  const initialState: GetUserRSIUrlFormState = { message: null, errors: {}, userDetails: { profileImage: session?.activeUser?.profile_image || "", handle: session?.activeUser?.handle || "", moniker: session?.activeUser?.moniker || "" } };
  const [state, formAction] = useActionState(updatePerson, initialState);

  const [formSaving, setFormSaving] = useState<boolean>(false);
  const [rsiFieldsDisabled, setRsiFieldsDisabled] = useState<boolean>(state?.userDetails?.handle && state?.userDetails?.moniker ? false : true);
  const [rsiUrlError, setRsiUrlError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(session?.activeUser?.profile_image || "");

  const urlInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useRef<HTMLInputElement>(null);
  const monikerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.message) {
      setFormSaving(false);
    }
  }, [state?.message]);

  return (
    <form action={formAction} onSubmit={() => {
       setFormSaving(true);
    }} className="flex flex-col gap-4 w-full">
      <input type="hidden" name="id" value={session?.activeUser?.id} />

      <FormWithErrorBlock error={state?.errors?.rsi_url || []}>
        <div className="flex flex-row gap-2">
          <TextField
            id="rsi_url"
            name="rsi_url"
            label="Enter your Spectrum account URL"
            placeholder="https://robertsspaceindustries.com/citizens/XXXXX"
            defaultValue={session?.activeUser?.rsi_url}
            size="small"
            variant="filled"
            inputRef={urlInputRef}
            className="flex-1"
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={async () => {
              const result = await scrapeRSIDetails(urlInputRef.current?.value || '');

              if (result &&'error' in result) {
                setRsiUrlError(result.error);
                return;
              }
              if (handleInputRef.current) {
                handleInputRef.current.value = result?.handle || '';
              }

              if (monikerInputRef.current) {
                monikerInputRef.current.value = result?.moniker || '';
              }
              setProfileImage(result?.profileImage || "");
              setRsiFieldsDisabled(false);
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
            variant="filled"
            inputRef={handleInputRef}
            disabled={rsiFieldsDisabled}
            focused={!rsiFieldsDisabled}
            defaultValue={session?.activeUser?.handle}
          />
        </FormWithErrorBlock>

        <FormWithErrorBlock error={state?.errors?.moniker || []} halfWidth>
          <TextField
            id="moniker"
            name="moniker"
            label="Spectrum Moniker"
            size="small"
            variant="filled"
            inputRef={monikerInputRef}
            disabled={rsiFieldsDisabled}
            focused={!rsiFieldsDisabled}
            defaultValue={session?.activeUser?.moniker}
          />
        </FormWithErrorBlock>
      </div>

      <FormWithErrorBlock error={state?.errors?.profileImage || []}>
        <ProfileImage image={profileImage}/>
      </FormWithErrorBlock>

      <div className="flex flex-row gap-2">
        <FormWithErrorBlock error={state?.errors?.timezone || []} halfWidth>
          <TextField
            select
            id="timezone"
            name="timezone"
            label="Timezone"
            size="small"
            defaultValue={session?.activeUser?.timezone.id || 1}
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
            defaultValue={session?.activeUser?.language?.id}
          >
            <MenuItem key={1} value={1}>
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
        <Button type="submit" variant="contained" color="primary" className="w-1/2" disabled={rsiFieldsDisabled || formSaving}>
          {formSaving ? "Saving..." : "Save"}
        </Button>
        <Button variant="outlined" color="primary" className="w-1/2" disabled={formSaving} onClick={() => {
          redirect("/profile");
        }}>
          Cancel
        </Button>
      </div>
      {state?.message && (
        <div className="flex flex-col">
          <p className="text-gray-800 text-md text-center text-red-500 italic mb-2">
            {state?.message}
          </p>
        </div>
      )}
    </form>
  );
}