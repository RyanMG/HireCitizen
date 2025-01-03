"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

interface ISideBarLinkProps {
  link?: string;
  text: string;
  children: React.ReactNode;
}

export default function SideBarLink({link, text, children}:ISideBarLinkProps): React.ReactNode {
	const pathname = usePathname();
  const textStyling = clsx(
    "group-hover:text-gray-300 text-lg",
    {
      "text-white": pathname === link,
      "text-gray-500": pathname !== link
    }
  );

  return (
    <div className="flex flex-row items-center py-1 gap-2 group">
      <svg
        className={clsx(
          "group-hover:fill-gray-300",
          {
            "fill-white": pathname === link,
            "fill-gray-500": pathname !== link
          }
        )}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
      >
        {children}
      </svg>

      {link &&
        <Link
          className={textStyling}
          href={link}
        >
         {text}
        </Link>
      }

      {!link &&
        <div className={textStyling}>
          {text}
        </div>
      }

    </div>
  );
}
