'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LogoutPage() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-72 border border-white rounded-lg p-4">
        <h1 className="font-bold text-center text-xl text-gray-200 pb-2">Session Expired</h1>
        <p className="text-gray-300">Your session has expired. You will be routed to the login page to re-authenticate</p>
      </div>
    </div>
  );
}
