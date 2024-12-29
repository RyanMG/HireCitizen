'use client';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Session } from "next-auth";
import { GetUserRSIUrlFormState, getRSIUserDetails } from "@query/person/actions";
import { useActionState, useState } from "react";
import Image from "next/image";
export default function NewUserProfileForm({ session }: { session: Session|null }) {
  const initialState: GetUserRSIUrlFormState = { message: null, errors: {}, userDetails: { profileImage: "", handle: "", moniker: "" } };
  const [state, formAction] = useActionState(getRSIUserDetails, initialState);
  const [urlLoading, setUrlLoading] = useState<boolean>(false);

  return (
    <div className="flex bg-gray-300 border border-gray-700 rounded-lg p-6">
      <form action={formAction} onSubmit={() => setUrlLoading(true)} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <TextField
            id="rsi_url"
            name="rsi_url"
            label="Enter your Spectrum account URL"
            placeholder="https://robertsspaceindustries.com/citizens/XXXXX"
            defaultValue={session?.activeUser?.rsi_url}
            className="w-full"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.rsi_url && state.errors?.rsi_url.map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {state?.userDetails?.handle === "" &&
          <Button type="submit" variant="contained" color="primary" className="w-full">
             {urlLoading ? "Verifying..." : "Verify"}
          </Button>
        }

        {state?.userDetails?.handle !== "" &&
          <>
            <TextField
              label="Account Handle"
              defaultValue={state?.userDetails?.handle}
              className="w-full"
            />

            <TextField
              label="Spectrum Moniker"
              defaultValue={state?.userDetails?.moniker}
              className="w-full"
            />
            {state?.userDetails?.profileImage &&
              <Image
                src={`https://robertsspaceindustries.com${state?.userDetails?.profileImage}`}
                alt="Spectrum Profile Image"
                width={100}
                height={100}
              />
            }
          </>
        }
      </form>
    </div>
  );
}