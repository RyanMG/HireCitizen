'use client';

import { Link } from "@mui/material";
import ProfileImage from "./profileImage";
import { TPerson } from "@/app/lib/definitions/person";
import ProfileDetailsItem from "./profileDetailsItem";

export default function PrimaryProfileDetailsBlock({user}: {user: TPerson}) {
  return (
    <div className="flex flex-row gap-4">
      <ProfileImage image={user?.profile_image || null} />

      <div className="flex flex-col gap-2 flex-1">

        <h1 className="text-2xl font-bold text-gray-300">{user?.moniker || "Unknown Citizen"}</h1>

        <ProfileDetailsItem label="RSI Handle" value={user?.handle || "Unknown Handle"} />

        {user?.rsi_url ? (
          <Link
            href={user?.rsi_url || ''}
            target="_blank"
            className="text-light-blue font-bold"
          >
            View on RSI
          </Link>
        ) : (
          <p className="text-gray-300 italic">No citizen profile found</p>
        )}

      </div>
    </div>
  );
}
