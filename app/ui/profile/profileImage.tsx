import Image from "next/image";
import { Session } from "next-auth";

export default function ProfileImage({ session }: { session: Session | null }) {
  return (
    <>
      {session?.activeUser?.profile_image &&
        <Image
          src={session?.activeUser?.profile_image}
          alt="Spectrum Profile Image"
          width={100}
          height={100}
          className="rounded-lg border border-gray-700"
          priority
        />
      }
      {!session?.activeUser?.profile_image &&
        <div className="h-[100px] w-[100px] bg-gray-300 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#999">
            <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
          </svg>
        </div>
      }
    </>
  );
}
