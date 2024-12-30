'use client';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Session } from "next-auth";
import { scrapeRSIDetails } from "@query/person/data";
import { GetUserRSIUrlFormState, updatePerson } from "@query/person/actions";
import { useActionState, useState } from "react";
import Image from "next/image";
import FormWithErrorBlock from "@components/formWIthErrorBlock";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import { Timezone } from "@/app/lib/definitions/misc";

export default function NewUserProfileForm({
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
    <div className="flex bg-gray-300 border border-gray-700 rounded-lg p-6">
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
                }
              }}
            >
              Verify
            </Button>
          </div>
          {rsiUrlError && <p className="text-red-500 text-sm">{rsiUrlError}</p>}

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
          {session?.activeUser?.profile_image &&
            <Image
              src={session?.activeUser?.profile_image}
              alt="Spectrum Profile Image"
              width={100}
              height={100}
              className="rounded-lg border border-gray-700"
            />
          }
          {!session?.activeUser?.profile_image &&
            <div className="h-[100px] w-[100px] bg-gray-300 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#999">
                <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
              </svg>
            </div>
          }
        </FormWithErrorBlock>

        <div className="flex flex-row gap-2">
          <FormWithErrorBlock error={state?.errors?.timezone || []} halfWidth>
            <TextField
              select
              id="timezone"
              name="timezone"
              label="Timezone"
              size="small"
              defaultValue={session?.activeUser?.timezone}
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

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="contained" color="primary" className="w-1/2">
            {formSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="outlined" color="primary" className="w-1/2">
            <Link href="/profile">
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
