"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface ISideBarLinkProps {
  link: string;
  text: string;
  children: React.ReactNode;
}

export default function SideBarLink({link, text, children}:ISideBarLinkProps): React.ReactNode {
	const pathname = usePathname();

  return (
    <div className="flex flex-row items-center gap-2 my-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={`${pathname === link ? "#FFF" : "#6B7280"}`}>
        {children}
      </svg>

      <Link
        className={`${pathname === link ? "text-white" : "text-gray-500"} text-lg`}
        href={link}
      >
          {text}
        </Link>
    </div>
  );
}
